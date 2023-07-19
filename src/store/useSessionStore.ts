import { Session } from '@supabase/supabase-js';
import { create } from 'zustand';

interface ISessionStore {
  session: Session | null;
  setSession: (session: Session) => void;
}

const useSessionStore = create<ISessionStore>((set) => ({
  session: null,
  setSession: (session: Session) => set({ session }),
}));

export default useSessionStore;
