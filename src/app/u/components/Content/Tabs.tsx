import { motion } from "framer-motion";
import { useState } from "react";
import { BsQuestionLg } from "react-icons/bs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import TabContent from "./TabContent";
import TabActions from "./TabActions";

export default function Tabs() {
  const [tabList] = useState<string[]>(["Suscripciones", "Movimientos"]);
  const [activeTab, setActiveTab] = useState(tabList[0]);

  return (
    <motion.section
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      className="bg-white h-auto mt-6 rounded-2xl text-black p-4"
    >
      <motion.div className="flex items-center justify-between">
        <motion.ul className="flex gap-2 items-center rounded-xl w-full">
          {tabList.map((tabName) => (
            <motion.li
              key={tabName}
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
                onClick={() => setActiveTab(tabName)}
                className={`p-2 rounded-lg  transition ${
                  activeTab === tabName
                    ? "bg-black text-white"
                    : "bg-transparent text-black"
                }`}
              >
                {tabName}
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
      <TabContent value={activeTab} />
      <TabActions />
    </motion.section>
  );
}
