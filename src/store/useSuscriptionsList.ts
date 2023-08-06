import { ISuscription } from '@/app/u/components/contentTabs/tabsSections/Suscriptions/suscription';
import { create } from 'zustand';

interface IActiveCards {
  suscriptionsList: ISuscription[];
  setSuscriptionsList: (suscriptionsList: ISuscription[]) => void;
}

const useSuscriptionsList = create<IActiveCards>((set) => ({
  suscriptionsList: [],
  setSuscriptionsList: (suscriptionsList: ISuscription[]) =>
    set({ suscriptionsList }),
}));

export default useSuscriptionsList;
