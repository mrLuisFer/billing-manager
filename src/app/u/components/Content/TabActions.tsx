import { motion } from 'framer-motion';
import { TbArrowMoveUp } from 'react-icons/tb';

const iconSize = '1.3rem';
export default function TabActions() {
  return (
    <motion.div
      className="mt-6 flex items-center justify-end"
      initial={{
        opacity: 0,
        y: 50,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
    >
      <motion.button
        className="flex items-center justify-center bg-black w-fit p-2 rounded-lg text-white"
        whileTap={{
          scale: 0.9,
        }}
      >
        <TbArrowMoveUp size={iconSize} />
        Agregar
      </motion.button>
    </motion.div>
  );
}
