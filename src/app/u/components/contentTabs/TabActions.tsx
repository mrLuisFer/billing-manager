import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { TbArrowMoveUp } from 'react-icons/tb';
import TabsModal from './tabsSections/TabsModal';

const iconSize = '1.3rem';
export default function TabActions({ activeTab }: { activeTab: string }) {
  const [activeActionsModal, setActiveActionsModal] = useState(false);

  useEffect(() => {
    if (activeActionsModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [activeActionsModal]);

  return (
    <motion.div
      className="mt-6 flex items-center justify-end"
      initial={{
        opacity: 0,
        y: 50,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
    >
      <motion.button
        className="flex items-center justify-center bg-black w-fit p-2 rounded-lg text-white"
        whileTap={{
          scale: 0.9,
        }}
        onClick={() => setActiveActionsModal(true)}
      >
        <TbArrowMoveUp size={iconSize} />
        Agregar
      </motion.button>
      {activeActionsModal &&
        typeof window !== 'undefined' &&
        createPortal(
          <TabsModal
            activeTab={activeTab}
            setActiveActionsModal={setActiveActionsModal}
          />,
          document.body,
        )}
    </motion.div>
  );
}
