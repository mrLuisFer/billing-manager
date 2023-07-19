"use client";
import HomeHeader from "@/components/home/header";
import supabase from "@/lib/supabase";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import ContentCards from "@/components/home/creditCards/ContentCards";
import Tabs from "@/components/home/Content/Tabs";

export default function UPage() {
  useEffect(() => {
    (async () => {
      const useResponse = await supabase.auth.getUser();
      const sessionResponse = await supabase.auth.getSession();

      console.log(useResponse, sessionResponse);
    })();
  }, []);

  return (
    <main>
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
