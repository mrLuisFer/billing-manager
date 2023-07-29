import { LuTrash } from 'react-icons/lu';
import { motion } from 'framer-motion';
import supabase from '@/lib/supabase';
import { Dispatch, SetStateAction } from 'react';
import useActiveCardsStore from '@/store/useActiveCards';

export default function CardActions({
  id,
  setIsEditingCards,
}: {
  id: string;
  setIsEditingCards: Dispatch<SetStateAction<boolean>>;
}) {
  const { cards, setActiveCards } = useActiveCardsStore((state) => state);

  const handleRemoveCard = async () => {
    const removeCardResponse = await supabase
      .from('cards')
      .delete()
      .eq('id', id)
      .select('*')
      .single();

    if (removeCardResponse.error) {
      return;
    }

    const filterRemovedCards = cards.filter(
      (card) => card.id !== removeCardResponse.data.id,
    );
    setActiveCards(filterRemovedCards);
    setIsEditingCards(false);
  };

  supabase
    .channel('custom-all-channel')
    .on(
      'postgres_changes',
      { event: 'DELETE', schema: 'public', table: 'users' },
      (payload: any) => {
        const filterRemovedCards = cards.filter(
          (card) => card.id !== payload.old.id,
        );
        setActiveCards(filterRemovedCards);
      },
    )
    .subscribe();

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
        onClick={handleRemoveCard}
      >
        <LuTrash />
      </button>
    </motion.div>
  );
}
