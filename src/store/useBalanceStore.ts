import { create } from 'zustand';

interface IBalanceStore {
  balance: number;
  setBalance: (balance: number) => void;
}

const useBalanceStore = create<IBalanceStore>((set) => ({
  balance: 0,
  setBalance: (balance: number) => set({ balance }),
}));

export default useBalanceStore;
