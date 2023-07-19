import { motion } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';
import { BiWindowClose } from 'react-icons/bi';
import InputCard from './InputCard';

export default function AddCard({
  setIsAddingCard,
}: {
  setIsAddingCard: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="absolute bg-black bg-opacity-80 h-screen w-full top-0 flex items-center justify-center">
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
            onClick={() => setIsAddingCard(false)}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
          >
            <BiWindowClose size="1.7rem" />
          </motion.button>
        </div>
        <motion.form className="pt-6">
          <InputCard
            label="Numero de tarjeta"
            name="number"
            inputProps={{
              type: 'number',
              pattern: '[0-9]*',
              inputMode: 'numeric',
              placeholder: '**** **** **** 1234',
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
          />
          <motion.div className="flex items-center gap-5 my-5">
            <InputCard
              label="Vencimiento"
              name="expiry"
              inputProps={{
                type: 'text',
                placeholder: 'MM/YY',
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
            />
            <InputCard
              label="Tipo"
              name="type"
              inputProps={{
                type: 'text',
                placeholder: 'Visa',
                className: 'italic placeholder:italic',
                disabled: true,
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
          />
          <motion.div className="flex flex-col items-center justify-center gap-4 pt-5">
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
              onClick={() => setIsAddingCard(false)}
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
    </div>
  );
}
