import React from 'react';
import { motion } from 'framer-motion';
import Spinner from '@/components/Spinner';
import { FiTrash } from 'react-icons/fi';
import { TiCancelOutline } from 'react-icons/ti';

interface SingleActionsProps {
  deleteMove: () => void;
  setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}

export default function SingleActions({
  deleteMove,
  setIsDeleting,
  isLoading,
}: SingleActionsProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      className="w-full items-center grid grid-cols-2 gap-4"
    >
      <motion.button
        onClick={() => deleteMove()}
        className="bg-red-500 transition text-white flex items-center justify-center rounded-lg capitalize gap-2 text-lg h-14"
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <FiTrash />
            delete
          </>
        )}
      </motion.button>
      <motion.button
        className="bg-neutral-300 text-black font-semibold flex items-center justify-center rounded-lg gap-2 h-14"
        onClick={() => setIsDeleting(false)}
      >
        <TiCancelOutline size="1.5rem" />
        Cancelar
      </motion.button>
    </motion.div>
  );
}
