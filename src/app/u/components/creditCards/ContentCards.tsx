import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { PiCardholderThin } from 'react-icons/pi';
import { createPortal } from 'react-dom';
import supabase from '@/lib/supabase';
import useSessionStore from '@/store/useSessionStore';
import useActiveCardsStore from '@/store/useActiveCards';
import { FiEdit } from 'react-icons/fi';
import { FcCancel } from 'react-icons/fc';
import { TbLayoutGridAdd } from 'react-icons/tb';
import Card from './Card';
import AddCard from './AddCard';

export default function ContentCards() {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [isEditingCards, setIsEditingCards] = useState(false);
  const session = useSessionStore((state) => state.session);
  const { cards, setActiveCards } = useActiveCardsStore((state) => state);

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
  }, [session, setActiveCards]);

  useEffect(() => {
    if (isAddingCard) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isAddingCard]);

  supabase
    .channel('custom-all-channel')
    .on(
      'postgres_changes',
      { event: 'DELETE', schema: 'public', table: 'cards' },
      (payload) => {
        const filterRemovedCards = cards.filter(
          (card) => card.id !== payload.old.id,
        );
        setActiveCards(filterRemovedCards);
      },
    )
    .subscribe();

  return (
    <motion.div className="mt-8 text-neutral-500">
      <motion.div className="flex items-center justify-between pb-4">
        <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {cards.length ? 'Tarjetas activas' : 'No tienes tarjetas activas'}
        </motion.h2>
        <AnimatePresence>
          <div className="flex items-center justify-end gap-4">
            <motion.button
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[var(--primary-dark)] p-2 rounded-2xl text-white"
              title={isEditingCards ? 'Cancelar' : 'Editar'}
              type="button"
              onClick={() => setIsAddingCard(true)}
            >
              <TbLayoutGridAdd />
            </motion.button>
            {cards.length ? (
              <motion.button
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-[var(--primary-dark)] p-2 rounded-2xl text-white"
                title={isEditingCards ? 'Cancelar' : 'Editar'}
                type="button"
                onClick={() => setIsEditingCards(!isEditingCards)}
              >
                {isEditingCards ? <FcCancel /> : <FiEdit />}
              </motion.button>
            ) : null}
          </div>
        </AnimatePresence>
      </motion.div>
      <AnimatePresence>
        {cards.length ? (
          <motion.div className="flex gap-6 overflow-x-scroll flex-nowrap pb-6">
            <AnimatePresence>
              {!(cards.length === 0) &&
                cards.map((card) => (
                  <Card
                    card={card}
                    key={card.id}
                    isEditingCards={isEditingCards}
                  />
                ))}
            </AnimatePresence>
          </motion.div>
        ) : null}
      </AnimatePresence>
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
        className="flex items-center w-full justify-between bg-[var(--primary-dark)] hover:bg-black transition py-3 px-4 rounded-xl hover:brightness-110 mt-4"
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
