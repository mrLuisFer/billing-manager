import React from 'react';
import { motion } from 'framer-motion';
import { ISuscription } from './suscription';
import SelectIcon from '../SelectIcon';
import SuscriptionStatus from './SuscriptionStatus';

export default function SingleSuscription({
  suscription,
  id,
}: {
  suscription: ISuscription;
  id: number;
}) {
  console.log({ suscription });

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
    >
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
    </motion.div>
  );
}
