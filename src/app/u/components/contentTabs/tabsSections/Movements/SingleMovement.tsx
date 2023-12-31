/* eslint-disable import/no-extraneous-dependencies */
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import supabase from '@/lib/supabase';
import { useDoubleTap } from 'use-double-tap';
import useMovementsList from '@/store/useMovementsList';
import { IMovement } from './movement';
import SelectIcon from '../SelectIcon';
import SingleActions from '../SingleActions';

interface SingleMovementProps {
  movement: IMovement;
  id: number;
}
function SingleMovement({ movement, id }: SingleMovementProps) {
  const [isDeletingMove, setIsDeletingMove] = useState<boolean>(false);
  const dateFormatted = new Date(movement.movementDate).toLocaleDateString();
  const { movementsList, setMovementsList } = useMovementsList(
    (state) => state,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const deleteMove = async () => {
    setIsLoading(true);
    const deleteMoveResponse = await supabase
      .from('movements')
      .delete()
      .eq('id', movement.id);

    if (deleteMoveResponse.error) {
      setIsDeletingMove(false);
      setIsLoading(false);
    }
  };

  const bindDoubleTap = useDoubleTap(() => {
    setIsDeletingMove(true);
  });

  supabase
    .channel('custom-delete-channel')
    .on(
      'postgres_changes',
      { event: 'DELETE', schema: 'public', table: 'movements' },
      (payload) => {
        const deletedMovement = payload.old as IMovement;
        setMovementsList(
          movementsList.filter((move) => move.id !== deletedMovement.id),
        );
      },
    )
    .subscribe();

  return (
    <motion.div
      className="flex items-center gap-2"
      key={movement.id}
      whileTap={{
        scale: 0.95,
      }}
      transition={{
        delay: id * 0.1,
      }}
      {...bindDoubleTap}
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          y: 20,
        }}
        className="bg-neutral-900 py-2 px-3 text-white rounded-lg w-full"
      >
        <AnimatePresence>
          {isDeletingMove ? (
            <SingleActions
              deleteMove={deleteMove}
              isLoading={isLoading}
              setIsDeleting={setIsDeletingMove}
              key={movement.id}
            />
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-[var(--primary-dark)] p-3 rounded-md text-xl">
                  <SelectIcon iconName={movement.icon_name} />
                </div>
                <div>
                  <h1 className="text-lg capitalize truncate w-[160px]">
                    {movement.name}
                  </h1>
                  <p className="text-xs opacity-40">{dateFormatted}</p>
                </div>
              </div>
              <div>
                <h2>
                  ${movement.count}
                  <span className="text-xs opacity-40">.00</span>
                </h2>
              </div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export default SingleMovement;
