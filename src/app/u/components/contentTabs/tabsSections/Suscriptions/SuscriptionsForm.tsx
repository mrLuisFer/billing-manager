import React, { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import supabase from '@/lib/supabase';
import useSessionStore from '@/store/useSessionStore';
import useSuscriptionsList from '@/store/useSuscriptionsList';
import Spinner from '@/components/Spinner';
import InputCard from '../../../creditCards/AddCard/InputCard';
import InputSelect from '../../../creditCards/AddCard/InputSelect';
import iconsList from '../iconsList';
import StatusSelect from './StatusSelect';
import { ISuscription } from './suscription';

const suscriptionSchema = yup.object().shape({
  name: yup.string().required('El nombre es requerido'),
  count: yup.number().required('El precio es requerido'),
  paymentDate: yup.string().required('La fecha de pago es requerida'),
});
type ISuscriptionSchema = yup.InferType<typeof suscriptionSchema>;

export default function SuscriptionsForm({
  setActiveActionsModal,
}: {
  setActiveActionsModal: Dispatch<SetStateAction<boolean>>;
}) {
  const [movementIcon, setMovementIcon] = useState<string>('');
  const [statusValue, setStatusValue] = useState('');
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const session = useSessionStore((state) => state.session);
  const { setSuscriptionsList, suscriptionsList } = useSuscriptionsList(
    (state) => state,
  );

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<ISuscriptionSchema>({
    resolver: yupResolver(suscriptionSchema),
    defaultValues: {
      name: '',
      count: undefined,
      paymentDate: '',
    },
  });

  const onSubmit = async (data: ISuscriptionSchema) => {
    setIsLoadingForm(true);
    const suscriptionResponse = await supabase.from('suscriptions').insert({
      name: data.name,
      count: data.count,
      paymentDate: data.paymentDate,
      owner: session?.user?.id,
      status: statusValue,
      icon_name: movementIcon,
    });

    if (suscriptionResponse.error) {
      return;
    }

    setIsLoadingForm(false);
    setActiveActionsModal(false);
    reset();
  };

  supabase
    .channel('custom-insert-channel')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'suscriptions' },
      (payload) => {
        const newSuscription = payload.new as ISuscription;
        setSuscriptionsList([...suscriptionsList, newSuscription]);
      },
    )
    .subscribe();

  return (
    <form
      className="pt-4 flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex items-center gap-4">
        <InputCard
          label="Nombre"
          name="name"
          inputProps={{
            type: 'text',
            placeholder: 'Nombre de la suscripcion',
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
        <div className="w-28">
          <InputCard
            label="Precio"
            name="count"
            inputProps={{
              type: 'number',
              inputMode: 'numeric',
              placeholder: '$ 0.00',
              min: 0,
              ...register('count'),
            }}
            errorMessage={errors.count?.message}
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
                delay: 0.3,
              },
            }}
          />
        </div>
      </div>
      <InputSelect
        label="Tipo de suscripcion"
        name="icon_name"
        items={iconsList}
        setValue={setMovementIcon}
      />
      <InputCard
        label="Fecha de pago"
        name="paymentDate"
        inputProps={{
          type: 'text',
          placeholder: 'Fecha de pago',
          className: 'w-full',
          ...register('paymentDate'),
        }}
        errorMessage={errors.paymentDate?.message}
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
      />
      <StatusSelect setStatus={setStatusValue} />
      <motion.div className="flex items-center justify-between mt-16">
        <Button
          variant="secondary"
          type="button"
          onClick={() => {
            setActiveActionsModal(false);
            reset();
          }}
          disabled={isLoadingForm}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoadingForm}>
          {isLoadingForm ? <Spinner /> : 'Agregar movimiento'}
        </Button>
      </motion.div>
    </form>
  );
}
