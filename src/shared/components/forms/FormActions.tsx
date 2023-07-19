import { motion } from 'framer-motion';
import { MotionLink } from '../Motion';

export default function FormActions({
  loading,
  isLogin = false,
}: {
  loading: boolean;
  isLogin?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2 items-center pt-4">
      {isLogin ? (
        <motion.button
          initial={{
            scale: 0,
          }}
          animate={{
            scale: 1,
          }}
          type="submit"
          className="text-white bg-blue-500 hover:bg-blue-400 px-8 py-3 rounded-2xl hover:scale-95 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? 'Cargando...' : 'Iniciar sesión'}
        </motion.button>
      ) : (
        <motion.button
          initial={{
            scale: 0,
          }}
          animate={{
            scale: 1,
          }}
          type="submit"
          className="text-white bg-orange-400 hover:bg-orange-300 px-8 py-3 rounded-2xl hover:scale-95 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? 'Cargando...' : 'Registrarme'}
        </motion.button>
      )}
      <MotionLink
        initial={{
          scale: 0,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        aria-disabled={loading}
        className="text-neutral-500 text-center w-fit mx-auto mt-4 no-underline hover:underline active:underline"
        href={loading ? '' : '/?params=2'}
      >
        Cancelar
      </MotionLink>
    </div>
  );
}
