import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { BsQuestionLg } from 'react-icons/bs';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import TabContent from './TabContent';
import TabActions from './TabActions';
import tabskeys from './tabsKeys';

const tabsList = [
  {
    name: 'Suscripciones',
    key: tabskeys.suscriptions,
  },
  {
    name: 'Movimientos',
    key: tabskeys.movements,
  },
];

export default function Tabs() {
  const [tabList] = useState<typeof tabsList>(tabsList);
  const [activeTab, setActiveTab] = useState<string>('');

  useEffect(() => {
    const storagedTabKey = localStorage.getItem('activeTab');
    if (storagedTabKey) {
      setActiveTab(storagedTabKey);
    }
  }, []);

  return (
    <motion.section
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      className="bg-white h-auto mt-6 rounded-2xl text-black px-4 pt-4 pb-5"
    >
      <motion.div className="flex items-center justify-between">
        <motion.ul className="flex gap-2 items-center rounded-xl w-full">
          {tabList.map((tabName) => (
            <motion.li
              key={tabName.key}
              value="account"
              whileTap={{
                scale: 0.9,
              }}
              initial={{
                y: -50,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
            >
              <motion.button
                onClick={() => {
                  setActiveTab(tabName.key);
                  localStorage.setItem('activeTab', tabName.key);
                }}
                className={`p-2 rounded-lg  transition ${
                  activeTab === tabName.key
                    ? 'bg-black text-white'
                    : 'bg-transparent text-black'
                }`}
              >
                {tabName.name}
              </motion.button>
            </motion.li>
          ))}
        </motion.ul>
        <Popover>
          <PopoverTrigger asChild>
            <motion.button
              initial={{
                opacity: 0,
                scale: 0.5,
                x: 100,
              }}
              animate={{
                opacity: 0.6,
                scale: 1,
                x: 0,
              }}
              className="bg-[var(--primary-dark)] text-white p-1 rounded-3xl"
              whileTap={{
                scale: 0.9,
                opacity: 1,
              }}
              whileHover={{
                scale: 0.9,
                opacity: 1,
              }}
            >
              <BsQuestionLg size="0.9rem" />
            </motion.button>
          </PopoverTrigger>
          <PopoverContent>
            Ve el registro de tus movimientos y suscripciones
          </PopoverContent>
        </Popover>
      </motion.div>
      <AnimatePresence>
        <TabContent value={activeTab} />
      </AnimatePresence>
      <TabActions activeTab={activeTab} />
    </motion.section>
  );
}
