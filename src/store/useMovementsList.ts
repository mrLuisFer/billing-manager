import { IMovement } from '@/app/u/components/contentTabs/tabsSections/Movements/movement';
import { create } from 'zustand';

interface IActiveCards {
  movementsList: IMovement[];
  setMovementsList: (movementsList: IMovement[]) => void;
}

const useMovementsList = create<IActiveCards>((set) => ({
  movementsList: [],
  setMovementsList: (movementsList: IMovement[]) => set({ movementsList }),
}));

export default useMovementsList;
