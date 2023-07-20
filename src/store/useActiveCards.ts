import { ICreditCard } from '@/app/u/components/creditCards/creditCard';
import { create } from 'zustand';

interface IActiveCards {
  cards: ICreditCard[];
  setActiveCards: (cards: ICreditCard[]) => void;
}

const useActiveCardsStore = create<IActiveCards>((set) => ({
  cards: [],
  setActiveCards: (cards) => set({ cards }),
}));

export default useActiveCardsStore;
