import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { MotionLink } from '@/shared/components/Motion';
import GoBackLink from '../../../../shared/components/forms/GoBackLink';

export default function ConfirmEmail() {
  const imgContainer = useRef(null);

  return (
    <section className="bg-black min-h-screen text-white grid grid-rows-2">
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 px-6">
        <div className="pt-6 flex justify-center">
          <GoBackLink />
        </div>
        <div className="flex flex-col items-center pt-6 gap-6">
          <motion.h1
            initial={{
              opacity: 0,
              y: 50,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="text-center text-3xl"
          >
            👋¡Tu camino hacia el éxito comienza aquí!
          </motion.h1>
          <motion.p
            initial={{
              opacity: 0,
              y: 50,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="text-center"
          >
            Confirma tu dirección de correo electrónico para desbloquear
            oportunidades increíbles.
          </motion.p>
          <motion.div className="flex gap-4 items-center justify-center">
            <MotionLink
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="text-xs w-fit border-2 py-2 px-3 rounded-2xl uppercase"
              href="/auth/help"
            >
              Necesitas ayuda?
            </MotionLink>
            <MotionLink
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="text-xs w-fit border-2 py-2 px-3 rounded-2xl uppercase"
              href="/auth/login"
            >
              Iniciar sesión
            </MotionLink>
          </motion.div>
        </div>
      </div>
      <motion.div
        ref={imgContainer}
        className="flex flex-col justify-end items-center text-neutral-700 text-sm gap-2 pb-4 text-center"
      >
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          whileTap={{
            scale: 0.9,
          }}
          drag
          dragConstraints={imgContainer}
        >
          <Image
            src="/assets/register/relax_img.svg"
            alt="Relájate y disfruta de un momento para ti"
            className="w-[200px] mb-4"
            aria-label="Relájate y disfruta de un momento para ti"
            width={200}
            height={100}
            draggable={false}
          />
        </motion.div>
        <motion.h2
          initial={{
            opacity: 0,
            y: 100,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="font-semibold"
        >
          Relájate y disfruta de un momento para ti.
        </motion.h2>
        <motion.p
          initial={{
            opacity: 0,
            y: 100,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="max-w-xs"
        >
          Pronto recibirás la confirmación en tu bandeja de entrada.
        </motion.p>
      </motion.div>
    </section>
  );
}
