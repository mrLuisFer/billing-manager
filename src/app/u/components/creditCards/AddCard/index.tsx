import { motion } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';
import { BiWindowClose } from 'react-icons/bi';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import supabase from '@/lib/supabase';
import useSessionStore from '@/store/useSessionStore';
import useGetTypeCreditCard from '@/app/u/helpers/useGetTypeCreditCard';
import Spinner from '@/components/Spinner';
import useActiveCardsStore from '@/store/useActiveCards';
import InputCard from './InputCard';
import { ICreditCard } from '../creditCard';

const addCardSchema = yup.object().shape({
  number: yup
    .string()
    .required('El numero de tarjeta es requerido')
    .min(13, 'El numero de tarjeta debe tener mas de 13 digitos')
    .max(19, 'El numero de tarjeta debe tener menos de 19 digitos'),
  expiry: yup.string().required('La fecha de expiracion es requerida'),
  name: yup.string().required('El nombre es requerido'),
});
type IFormInputs = yup.InferType<typeof addCardSchema>;

export default function AddCard({
  setIsAddingCard,
}: {
  setIsAddingCard: Dispatch<SetStateAction<boolean>>;
}) {
  const session = useSessionStore((state) => state.session);
  const { cards, setActiveCards } = useActiveCardsStore((state) => state);

  const {
    handleSubmit,
    register,
    formState: { errors, isLoading },
    reset,
    control,
  } = useForm<IFormInputs>({
    resolver: yupResolver(addCardSchema),
    defaultValues: {
      number: '',
      expiry: '',
      name: '',
    },
  });
  const cardNumber = useWatch({
    control,
    name: 'number',
    defaultValue: '',
  });
  const cardType = useGetTypeCreditCard(cardNumber);

  const handleCancelAddCard = () => {
    reset();
    setIsAddingCard(false);
  };

  const handleAddNewCard = async (data: IFormInputs) => {
    if (!session) return;
    const monthAndYear = data.expiry.split('-');
    const shortYear = monthAndYear[0].slice(2);
    const cardDate = `${monthAndYear[1]}/${shortYear}`;

    const addCardResponse = await supabase.from('cards').insert({
      number: data.number,
      expiry: cardDate,
      type: cardType.name,
      name: data.name,
      owner: session?.user.id,
      bg_color: cardType.color,
    });

    if (addCardResponse.error) {
      return;
    }

    handleCancelAddCard();
  };

  supabase
    .channel('custom-insert-channel')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'cards' },
      (payload) => {
        const newCard = payload.new as ICreditCard;
        setActiveCards([...cards, newCard]);
      },
    )
    .subscribe();

  return (
    <div className="fixed bg-black bg-opacity-80 h-screen w-full top-0 flex items-center justify-center">
      {isLoading ? (
        <Spinner />
      ) : (
        <motion.div
          initial={{
            opacity: 0,
            y: 100,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          className="bg-[var(--primary-dark)] p-4 rounded-2xl text-white w-[350px]"
        >
          <div className="flex items-center justify-between">
            <h1 className="font-bold">Agregar Tarjeta</h1>
            <motion.button
              type="button"
              className="text-red-400 hover:text-red-300 transition"
              onClick={handleCancelAddCard}
            >
              <BiWindowClose size="1.7rem" />
            </motion.button>
          </div>
          <motion.form
            className="pt-6"
            onSubmit={handleSubmit(handleAddNewCard)}
          >
            <InputCard
              label="Numero de tarjeta"
              name="number"
              inputProps={{
                type: 'number',
                pattern: '[0-9]*',
                inputMode: 'numeric',
                placeholder: '**** **** **** 1234',
                ...register('number'),
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
              errorMessage={errors.number?.message}
            />
            <motion.div className="my-5 grid grid-cols-[1fr_110px] gap-2">
              <InputCard
                label="Vencimiento"
                name="expiry"
                inputProps={{
                  type: 'month',
                  placeholder: 'MM/YY',
                  className: 'text-white',
                  ...register('expiry'),
                }}
                containerAnimation={{
                  initial: {
                    x: -50,
                    opacity: 0,
                  },
                  animate: {
                    x: 0,
                    opacity: 1,
                  },
                  transition: {
                    delay: 0.2,
                  },
                }}
                errorMessage={errors.expiry?.message}
                helper="Mes / Año"
              />
              <InputCard
                label="Tipo"
                name="type"
                inputProps={{
                  type: 'text',
                  placeholder: 'Visa',
                  className: 'italic text-sm placeholder:italic',
                  disabled: true,
                  value: cardType.name,
                }}
                containerAnimation={{
                  initial: {
                    x: 50,
                    opacity: 0,
                  },
                  animate: {
                    x: 0,
                    opacity: 1,
                  },
                  transition: {
                    delay: 0.2,
                  },
                }}
              />
            </motion.div>
            <InputCard
              label="Nombre"
              name="name"
              inputProps={{
                type: 'text',
                inputMode: 'text',
                placeholder: 'Luis Alvarez',
                ...register('name'),
              }}
              containerAnimation={{
                initial: {
                  opacity: 0,
                  y: 50,
                },
                animate: {
                  opacity: 1,
                  y: 0,
                },
                transition: {
                  delay: 0.2,
                },
              }}
              errorMessage={errors.name?.message}
            />
            <motion.div className="flex flex-col items-center justify-center gap-5 pt-5">
              <motion.button
                type="submit"
                className="bg-neutral-100 text-black w-full rounded-xl py-3 shadow-sm select-none"
                whileTap={{
                  scale: 0.95,
                }}
                initial={{
                  opacity: 0,
                  scale: 0,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  delay: 0.3,
                }}
              >
                Guardar
              </motion.button>
              <motion.button
                type="button"
                className="select-none hover:underline text-neutral-500"
                onClick={handleCancelAddCard}
                initial={{
                  opacity: 0,
                  y: 50,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.1,
                }}
              >
                Cancelar
              </motion.button>
            </motion.div>
          </motion.form>
        </motion.div>
      )}
    </div>
  );
}
