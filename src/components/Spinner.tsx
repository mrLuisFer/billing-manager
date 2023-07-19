import { AiOutlineLoading } from 'react-icons/ai';
import { motion } from 'framer-motion';

export default function Spinner() {
  return (
    <motion.div
      className="text-4xl animate-spin transition"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
    >
      <AiOutlineLoading />
    </motion.div>
  );
}
