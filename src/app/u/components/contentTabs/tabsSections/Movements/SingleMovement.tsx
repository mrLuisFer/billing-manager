/* eslint-disable import/no-extraneous-dependencies */
import {
  AnimatePresence,
  PanInfo,
  motion,
  useDragControls,
} from 'framer-motion';
import { RefObject, forwardRef, useState } from 'react';
import supabase from '@/lib/supabase';
import { useDoubleTap } from 'use-double-tap';
import useMovementsList from '@/store/useMovementsList';
import Spinner from '@/components/Spinner';
import { FiTrash } from 'react-icons/fi';
import { TiCancelOutline } from 'react-icons/ti';
import { IMovement } from './movement';
import SelectIcon from '../SelectIcon';

interface SingleMovementProps {
  movement: IMovement;
  id: number;
}
function SingleMovement({ movement, id }: SingleMovementProps, ref: any) {
  const [isDeletingMove, setIsDeletingMove] = useState<boolean>(false);
  const dateFormatted = new Date(movement.movementDate).toLocaleDateString();
  const controls = useDragControls();
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

  const handleDrag = async (
    e: globalThis.MouseEvent | globalThis.TouchEvent | globalThis.PointerEvent,
    info: PanInfo,
  ) => {
    const pointX = info.point.x;

    if (pointX <= -90) {
      setIsDeletingMove(true);
      deleteMove();
    }

    setIsDeletingMove(false);
  };

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
      className="flex items-center gap-2 w-full"
      key={movement.id}
      whileTap={{
        scale: 0.95,
      }}
      transition={{
        delay: id * 0.1,
      }}
      drag="x"
      dragConstraints={ref}
      onDrag={handleDrag}
      dragControls={controls}
      {...bindDoubleTap}
    >
      <AnimatePresence>
        {isDeletingMove ? (
          <div className="w-full items-center grid grid-cols-2 gap-4">
            <motion.button
              onClick={() => deleteMove()}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              className="bg-red-500 transition text-white flex items-center justify-center rounded-lg capitalize gap-2 text-lg h-14"
            >
              {isLoading ? (
                <Spinner />
              ) : (
                <>
                  <FiTrash />
                  delete
                </>
              )}
            </motion.button>
            <motion.button
              className="bg-neutral-300 font-semibold flex items-center justify-center rounded-lg gap-2 h-14"
              onClick={() => setIsDeletingMove(false)}
            >
              <TiCancelOutline size="1.5rem" />
              Cancelar
            </motion.button>
          </div>
        ) : (
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
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const forwardSingleMovement = forwardRef<
  RefObject<HTMLDivElement>,
  SingleMovementProps
>(SingleMovement);
export default forwardSingleMovement;
