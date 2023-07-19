import { motion } from "framer-motion";
import { useState } from "react";
import Card from "./Card";
import { PiCardholderThin } from "react-icons/pi";

export interface ICreditCard {
  cardNumber: string;
  id: string;
  name: string;
  type: string;
}
export default function ContentCards() {
  const [activeCards, setActiveCards] = useState<ICreditCard[]>([
    {
      id: "1",
      name: "Luis",
      cardNumber: "**** **** **** 1234",
      type: "visa",
    },
    {
      id: "2",
      name: "Fer",
      cardNumber: "**** **** **** 9878",
      type: "visa",
    },
  ]);

  return (
    <motion.div className="mt-8 text-neutral-500">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pb-4"
      >
        Tarjetas activas:
      </motion.h2>
      <motion.div className="flex gap-6 overflow-x-scroll flex-nowrap pb-6">
        {!(activeCards.length === 0) &&
          activeCards.map((card, i) => <Card card={card} key={card.id} />)}
      </motion.div>
      <motion.button
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        whileTap={{
          scale: 0.95,
          backgroundColor: "#000000",
        }}
        whileHover={{
          scale: 0.95,
        }}
        className="flex items-center w-full justify-between bg-[var(--primary-dark)] hover:bg-black transition py-2 px-4 rounded-xl hover:brightness-110 mt-4"
      >
        <motion.p>Agregar tarjeta</motion.p>
        <motion.div>
          <PiCardholderThin size="1.5rem" />
        </motion.div>
      </motion.button>
    </motion.div>
  );
}
