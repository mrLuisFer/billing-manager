'use client';

import supabase from '@/lib/supabase';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Tabs from '@/app/u/components/contentTabs/Tabs';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/Spinner';
import useSessionStore from '@/store/useSessionStore';
import HomeHeader from './components/header';
import ContentCards from './components/creditCards/ContentCards';
import Balance from './components/balance';

export default function UPage() {
  const { setSession } = useSessionStore((state) => state);
  const router = useRouter();
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setIsLoadingUser(true);
      const sessionResponse = await supabase.auth.getSession();

      if (sessionResponse.error || sessionResponse.data?.session === null) {
        await supabase.auth.signOut();
        router.push('/auth/login');
        return;
      }

      const currentSession = sessionResponse.data.session;
      if (currentSession) {
        setIsLoadingUser(false);
        setSession(currentSession);
      }
    })();
  }, [router, setSession]);

  if (isLoadingUser) {
    return (
      <main className="min-h-screen flex justify-center items-center w-full overflow-x-hidden">
        <Spinner />
      </main>
    );
  }

  return (
    <main className="pb-10">
      <HomeHeader />
      <motion.section className="px-4 pt-6">
        <Balance />
        <ContentCards />
        <Tabs />
      </motion.section>
    </main>
  );
}
