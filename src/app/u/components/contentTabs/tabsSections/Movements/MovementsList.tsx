import supabase from '@/lib/supabase';
import useSessionStore from '@/store/useSessionStore';
import { useEffect, useRef, useState } from 'react';
import Spinner from '@/components/Spinner';
import { motion } from 'framer-motion';
import useMovementsList from '@/store/useMovementsList';
import { IMovement } from './movement';
import SingleMovement from './SingleMovement';

export default function MovementsList() {
  const session = useSessionStore((state) => state.session);
  const [loading, setLoading] = useState(false);
  const { movementsList, setMovementsList } = useMovementsList(
    (state) => state,
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const movementsResponse = await supabase
        .from('movements')
        .select('*')
        .eq('owner', session?.user.id);

      if (movementsResponse.error) {
        return;
      }

      if (movementsResponse.data) {
        setMovementsList(movementsResponse.data as IMovement[]);
        setLoading(false);
      }
    })();
  }, [session?.user.id, setMovementsList]);

  if (loading) {
    return (
      <motion.section className="flex justify-center py-4">
        <Spinner />
      </motion.section>
    );
  }

  return (
    <section className="py-4 flex flex-col gap-4" ref={containerRef}>
      {movementsList.map((movement) => (
        <SingleMovement
          key={movement.id}
          movement={movement}
          ref={containerRef}
        />
      ))}
    </section>
  );
}
