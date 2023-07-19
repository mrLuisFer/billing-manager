import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import fetchBalance from '../../helpers/fetchBalance';

export default function Balance({ id }: { id: string }) {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    (async () => {
      const balanceRes = await fetchBalance(id);
      if (balanceRes || balanceRes === 0) {
        setBalance(balanceRes);
      }
    })();
  }, [id]);

  return (
    <motion.div>
      <motion.p
        className="text-neutral-500 text-sm"
        initial={{
          opacity: 0,
          x: -50,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
      >
        Balance total
      </motion.p>
      <motion.h1
        className="text-3xl font-bold pt-2"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
      >
        $ {balance}.00
      </motion.h1>
    </motion.div>
  );
}
