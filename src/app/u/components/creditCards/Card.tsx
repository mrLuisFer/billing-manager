import { FcSimCardChip } from 'react-icons/fc';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { AnimatePresence, motion } from 'framer-motion';
import { Dispatch, SetStateAction, useState } from 'react';
import { ICreditCard } from './creditCard';
import formatCreditNumber, {
  formatCreditNumberWithSpaces,
} from '../../helpers/formatCreditNumbers';
import CardActions from './CardActions';

export default function Card({
  card,
  isEditingCards,
  setIsEditingCards,
}: {
  card: ICreditCard;
  isEditingCards: boolean;
  setIsEditingCards: Dispatch<SetStateAction<boolean>>;
}) {
  const [showCardNumber, setShowCardNumber] = useState(false);
  const formattedNumber = formatCreditNumber(card.number!);

  return (
    <motion.div
      whileTap={{
        scale: 0.95,
      }}
      key={card.id}
      initial={{
        opacity: 0,
        x: 100,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      className="relative rounded-xl h-[200px] min-w-[340px] w-full p-4 flex flex-col justify-between"
      style={{
        backgroundColor: card?.bg_color ? card.bg_color : 'var(--primary-dark)',
      }}
    >
      <AnimatePresence>
        {isEditingCards && (
          <CardActions id={card.id} setIsEditingCards={setIsEditingCards} />
        )}
      </AnimatePresence>
      <header className="flex items-center justify-between">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="uppercase font-bold italic tracking-wider text-white"
        >
          {card.type}
        </motion.p>
        <motion.div
          whileTap={{
            scale: 0.95,
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <FcSimCardChip size="3rem" />
        </motion.div>
      </header>
      <article className="h-fit">
        <motion.div
          className="pb-2"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
        >
          <p className="font-bold tracking-widest text-xl text-white">
            {card.name}
          </p>
        </motion.div>
        <p className="text-sm text-neutral-500">Numero de tarjeta</p>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                className="select-none"
                onClick={() => setShowCardNumber(!showCardNumber)}
              >
                <h3 className="text-2xl tracking-wider font-bold text-neutral-300 hover:text-white">
                  {showCardNumber
                    ? formatCreditNumberWithSpaces(card.number!)
                    : formattedNumber}
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
