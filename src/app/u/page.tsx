"use client";

import supabase from "@/lib/supabase";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Tabs from "@/app/u/components/Content/Tabs";
import HomeHeader from "./components/header";
import ContentCards from "./components/creditCards/ContentCards";

export default function UPage() {
  useEffect(() => {
    (async () => {
      const useResponse = await supabase.auth.getUser();
      const sessionResponse = await supabase.auth.getSession();

      console.log(useResponse, sessionResponse);
    })();
  }, []);

  return (
    <main className="pb-10">
      <HomeHeader />
      <motion.section className="px-4 pt-6">
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
            Balance Total
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
            $ 0.00
          </motion.h1>
        </motion.div>
        <ContentCards />
        <Tabs />
      </motion.section>
    </main>
  );
}
