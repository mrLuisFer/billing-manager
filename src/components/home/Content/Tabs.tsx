import { motion } from "framer-motion";
import { useState } from "react";
import TabContent from "./TabContent";

export default function Tabs() {
  const [tabList, setTabList] = useState<string[]>([
    "Suscripciones",
    "Movimientos",
  ]);
  const [activeTab, setActiveTab] = useState("account");

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
      <motion.ul className="flex gap-4 items-center rounded-xl w-full">
        {tabList.map((tabName) => (
          <motion.li
            key={tabName}
            value="account"
            onClick={() => setActiveTab(tabName)}
            whileTap={{
              scale: 0.9,
            }}
          >
            <motion.div
              className={`p-2 rounded-lg  transition ${
                activeTab === tabName
                  ? "bg-black text-white"
                  : "bg-transparent text-black"
              }`}
            >
              {tabName}
            </motion.div>
          </motion.li>
        ))}
      </motion.ul>
      <TabContent value={activeTab} />
    </motion.section>
  );
}
