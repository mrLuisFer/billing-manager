import { motion } from "framer-motion";

export default function TabContent({ value }: { value: string }) {
  return <motion.div className="mt-4">{value}</motion.div>;
}
