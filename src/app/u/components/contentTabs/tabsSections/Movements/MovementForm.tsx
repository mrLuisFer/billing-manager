/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, type Dispatch, type SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Spinner from '@/components/Spinner';
import supabase from '@/lib/supabase';
import useSessionStore from '@/store/useSessionStore';
import useMovementsList from '@/store/useMovementsList';
import useBalanceStore from '@/store/useBalanceStore';
import InputCard from '../../../creditCards/AddCard/InputCard';
import { IMovement } from './movement';
import InputSelect from '../../../creditCards/AddCard/InputSelect';
import iconsList from '../iconsList';

const movementSchema = yup.object().shape({
  name: yup.string().required('El nombre es requerido'),
  price: yup.number().required('El precio es requerido'),
  movementDate: yup.string().nullable().optional(),
});
type IMovementSchema = yup.InferType<typeof movementSchema>;

export default function MovementForm({
  setActiveActionsModal,
}: {
  setActiveActionsModal: Dispatch<SetStateAction<boolean>>;
}) {
  const session = useSessionStore((state) => state.session);
  const [movementIcon, setMovementIcon] = useState<string>('');
  const { movementsList, setMovementsList } = useMovementsList(
    (state) => state,
  );
  const { balance, setBalance } = useBalanceStore((state) => state);

  const {
    handleSubmit,
    register,
    formState: { errors, isLoading },
    reset,
  } = useForm<IMovementSchema>({
    resolver: yupResolver(movementSchema) as any,
    defaultValues: {
      name: '',
      price: undefined,
      movementDate: `${Date.now()}`,
    },
  });

  const onSubmit = async (data: IMovementSchema) => {
    const movementSubmitResponse = await supabase
      .from('movements')
      .insert({
        name: data.name,
        owner: session?.user.id,
        count: data.price,
        icon_name: movementIcon,
        movementDate: `${
          data.movementDate || new Date().toISOString().toLocaleString()
        }`,
      })
      .eq('id', session?.user.id);

    if (movementSubmitResponse.error) {
      return;
    }

    setBalance(balance - data.price);
    await supabase
      .from('users')
      .update({
        balance: balance - data.price,
      })
      .eq('id', session?.user.id);

    reset();
    setActiveActionsModal(false);
  };

  supabase
    .channel('custom-insert-channel')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'movements' },
      (payload) => {
        const newMovement = payload.new as IMovement;
        setMovementsList([...movementsList, newMovement]);
      },
    )
    .subscribe();

  if (isLoading) {
    return (
      <motion.div className="flex p-4 items-center justify-center">
        <Spinner />
      </motion.div>
    );
  }

  return (
    <form
      className="pt-4 flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <InputCard
          label="Nombre"
          name="name"
          inputProps={{
            type: 'text',
            placeholder: 'Nombre del movimiento',
            required: true,
            ...register('name'),
          }}
          containerAnimation={{
            initial: {
              opacity: 0,
              y: -50,
            },
            animate: {
              y: 0,
              opacity: 1,
            },
            transition: {
              delay: 0.2,
            },
          }}
          errorMessage={errors.name?.message}
        />
        <div className="w-[140px]">
          <InputCard
            label="Precio"
            name="price"
            inputProps={{
              type: 'number',
              inputMode: 'numeric',
              min: 0,
              max: 999999,
              placeholder: '$0',
              required: true,
              ...register('price'),
            }}
            containerAnimation={{
              initial: {
                opacity: 0,
                y: -50,
              },
              animate: {
                y: 0,
                opacity: 1,
              },
              transition: {
                delay: 0.2,
              },
            }}
            errorMessage={errors.price?.message}
          />
        </div>
      </div>
      <InputSelect
        label="Tipo de movimiento"
        name="icon"
        setValue={setMovementIcon}
        items={iconsList}
      />
      <InputCard
        label="Fecha del movimiento"
        name="movementDate"
        inputProps={{
          type: 'date',
          placeholder: 'Fecha del movimiento',
          className: 'w-full',
          ...register('movementDate'),
        }}
        containerAnimation={{
          initial: {
            opacity: 0,
            y: 50,
          },
          animate: {
            y: 0,
            opacity: 1,
          },
          transition: {
            delay: 0.3,
          },
        }}
        helper="Si lo dejas vacio se tomara la fecha actual"
      />
      <motion.div className="flex items-center justify-between mt-6">
        <Button
          variant="secondary"
          type="button"
          onClick={() => {
            setActiveActionsModal(false);
            reset();
          }}
        >
          Cancelar
        </Button>
        <Button type="submit">Agregar movimiento</Button>
      </motion.div>
    </form>
  );
}
