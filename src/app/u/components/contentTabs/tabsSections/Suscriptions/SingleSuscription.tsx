import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useDoubleTap } from 'use-double-tap';
import supabase from '@/lib/supabase';
import useSuscriptionsList from '@/store/useSuscriptionsList';
import { ISuscription } from './suscription';
import SelectIcon from '../SelectIcon';
import SuscriptionStatus from './SuscriptionStatus';
import SingleActions from '../SingleActions';

export default function SingleSuscription({
  suscription,
  id,
}: {
  suscription: ISuscription;
  id: number;
}) {
  const [isDeletingSuscription, setIsDeletingSuscription] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setSuscriptionsList, suscriptionsList } = useSuscriptionsList(
    (state) => state,
  );

  const bindDoubleTap = useDoubleTap(() => {
    setIsDeletingSuscription(true);
  });

  const onDelete = async () => {
    setIsLoading(true);
    const deleteSuscriptionResponse = await supabase
      .from('suscriptions')
      .delete()
      .eq('id', suscription.id)
      .select();

    if (deleteSuscriptionResponse.error) {
      setIsDeletingSuscription(false);
      setIsLoading(false);
    }

    const suscriptionDeleted = deleteSuscriptionResponse.data![0].id;
    setSuscriptionsList(
      suscriptionsList.filter(
        (suscriptionFiltered) => suscriptionFiltered.id !== suscriptionDeleted,
      ),
    );
    setIsLoading(false);
  };

  supabase
    .channel('custom-delete-channel')
    .on(
      'postgres_changes',
      { event: 'DELETE', schema: 'public', table: 'suscriptions' },
      (payload) => {
        const deletedSuscription = payload.old as ISuscription;
        setSuscriptionsList(
          suscriptionsList.filter(
            (suscriptionFiltered) =>
              suscriptionFiltered.id !== deletedSuscription.id,
          ),
        );
      },
    )
    .subscribe();

  return (
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
      transition={{
        delay: id * 0.1,
      }}
      className="bg-neutral-900 px-2 py-3 rounded-lg text-white flex items-center gap-3"
      {...bindDoubleTap}
    >
      <AnimatePresence>
        {isDeletingSuscription ? (
          <SingleActions
            isLoading={isLoading}
            key={suscription.id}
            setIsDeleting={setIsDeletingSuscription}
            deleteMove={onDelete}
          />
        ) : (
          <>
            <div className="bg-[var(--primary-dark)] p-3 rounded-xl w-fit text-2xl">
              <SelectIcon iconName={suscription.icon_name!} />
            </div>
            <div className="flex flex-col gap-1 justify-between w-full">
              <div className="flex items-center justify-between">
                <h1 className="uppercase font-bold">{suscription.name}</h1>
                <h2 className="font-semibold">
                  <span className="opacity-40 pr-1">$</span>
                  {suscription.count}
                  <span className="opacity-40 text-sm">.00</span>
                </h2>
              </div>
              <div className="flex items-center justify-between">
                <SuscriptionStatus status={suscription.status!} />
                <p className="text-sm opacity-30 capitalize">
                  {suscription.paymentDate}
                </p>
              </div>
            </div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
