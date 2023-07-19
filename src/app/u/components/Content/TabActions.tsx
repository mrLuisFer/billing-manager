import { motion } from 'framer-motion';
import { TbArrowMoveUp } from 'react-icons/tb';

const iconSize = '1.3rem';
export default function TabActions() {
  return (
    <motion.div
      className="mt-6"
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
        className="flex items-center justify-center bg-black w-fit py-1 px-2 rounded-lg text-white"
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
