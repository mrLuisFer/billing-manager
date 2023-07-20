import { LuTrash } from 'react-icons/lu';
import { motion } from 'framer-motion';

export default function CardActions() {
  return (
    <motion.div
      className="absolute top-2 right-2"
      initial={{
        opacity: 0,
        y: -50,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: -50,
      }}
    >
      <button
        type="button"
        className="bg-red-400 text-white p-2 rounded-lg shadow-lg hover:scale-95"
      >
        <LuTrash />
      </button>
    </motion.div>
  );
}
