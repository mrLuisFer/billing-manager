import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { PiCardholderThin } from 'react-icons/pi';
import { createPortal } from 'react-dom';
import supabase from '@/lib/supabase';
import useSessionStore from '@/store/useSessionStore';
import Card from './Card';
import { ICreditCard } from './creditCard';
import AddCard from './AddCard';

export default function ContentCards() {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [activeCards, setActiveCards] = useState<ICreditCard[]>([]);
  const session = useSessionStore((state) => state.session);

  useEffect(() => {
    (async () => {
      if (!session) return;
      const cardsResponse = await supabase
        .from('cards')
        .select('*')
        .eq('owner', session?.user.id);

      if (cardsResponse.error) {
        return;
      }

      if (cardsResponse.data) {
        setActiveCards(cardsResponse?.data);
      }
    })();
  }, [session]);

  useEffect(() => {
    if (isAddingCard) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isAddingCard]);

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
          activeCards.map((card) => <Card card={card} key={card.id} />)}
      </motion.div>
      <motion.button
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        whileTap={{
          scale: 0.95,
          backgroundColor: '#000000',
        }}
        whileHover={{
          scale: 0.95,
        }}
        className="flex items-center w-full justify-between bg-[var(--primary-dark)] hover:bg-black transition py-2 px-4 rounded-xl hover:brightness-110 mt-4"
        onClick={() => setIsAddingCard(true)}
      >
        <motion.p>Agregar tarjeta</motion.p>
        <motion.div>
          <PiCardholderThin size="1.5rem" />
        </motion.div>
      </motion.button>
      {isAddingCard &&
        typeof window !== 'undefined' &&
        createPortal(
          <AddCard setIsAddingCard={setIsAddingCard} />,
          document.body,
        )}
    </motion.div>
  );
}
