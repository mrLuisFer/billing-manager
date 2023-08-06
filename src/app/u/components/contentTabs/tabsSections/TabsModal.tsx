import React, { type Dispatch, type SetStateAction } from 'react';
import { CgClose } from 'react-icons/cg';
import { motion } from 'framer-motion';
import MovementForm from './Movements/MovementForm';
import SuscriptionsForm from './Suscriptions/SuscriptionsForm';

const modalTitle = {
  movements: 'Movimiento',
  suscriptions: 'Suscripcion',
};

export default function TabsModal({
  activeTab,
  setActiveActionsModal,
}: {
  activeTab: string;
  setActiveActionsModal: Dispatch<SetStateAction<boolean>>;
}) {
  const forms = {
    movements: <MovementForm setActiveActionsModal={setActiveActionsModal} />,
    suscriptions: (
      <SuscriptionsForm setActiveActionsModal={setActiveActionsModal} />
    ),
  };

  return (
    <section className="fixed bg-black bg-opacity-80 h-screen w-full top-0 flex items-center justify-center">
      <motion.div
        className="bg-[var(--primary-dark)] p-4 w-[330px] rounded-xl"
        initial={{
          opacity: 0,
          scale: 0,
        }}
        animate={{
          opacity: 100,
          scale: 1,
        }}
      >
        <header className="flex justify-between items-center">
          <h1 className="font-semibold">
            Agregar {modalTitle[activeTab as never]}
          </h1>
          <button type="button" onClick={() => setActiveActionsModal(false)}>
            <CgClose size="1.2rem" />
          </button>
        </header>
        {forms[activeTab as never] || null}
      </motion.div>
    </section>
  );
}
