import { FcSimCardChip } from "react-icons/fc";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { ICreditCard } from "./ContentCards";

export default function Card({ card }: { card: ICreditCard }) {
  return (
    <motion.div
      key={card.id}
      initial={{
        opacity: 0,
        x: 100,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      className="bg-[var(--primary-dark)] rounded-xl h-[200px] min-w-fit p-4 flex flex-col justify-between"
    >
      <header className="flex justify-between items-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="uppercase font-bold italic tracking-wider"
        >
          {card.type}
        </motion.p>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
          <FcSimCardChip size="3rem" />
        </motion.div>
      </header>
      <article className="h-fit">
        <p className="text-sm">Numero de tarjeta</p>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="select-none">
                <h3 className="text-2xl tracking-wider font-bold text-neutral-300 hover:text-white">
                  {card.cardNumber}
                </h3>
              </button>
            </TooltipTrigger>
            <TooltipContent>Mostrar numero de tarjeta completo</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </article>
    </motion.div>
  );
}
