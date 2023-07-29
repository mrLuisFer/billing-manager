import { AnimatePresence } from 'framer-motion';
import MovementsList from './tabsSections/Movements/MovementsList';
import SuscriptionsList from './tabsSections/Suscriptions/SuscriptionsList';
import tabskeys from './tabsKeys';

export default function TabContent({ value }: { value: string }) {
  switch (value) {
    case tabskeys.movements:
      return (
        <AnimatePresence>
          <MovementsList />
        </AnimatePresence>
      );
    case tabskeys.suscriptions:
      return (
        <AnimatePresence>
          <SuscriptionsList />
        </AnimatePresence>
      );
    default:
      return null;
  }
}
