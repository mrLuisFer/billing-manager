'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GoBackLink from '@/shared/components/forms/GoBackLink';
import HeroInfo from '@/shared/components/forms/HeroInfo';
import EmailInput from '@/shared/components/forms/EmailInput';
import PassInput from '@/shared/components/forms/PassInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  LoginSchema,
  loginSchema as loginFormSchema,
} from '@/types/register/formSchema';
import FormActions from '@/shared/components/forms/FormActions';
import supabase from '@/lib/supabase';
import Spinner from '@/components/Spinner';

const loginSchema = yup.object().shape(loginFormSchema);

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleLoginForm = async (data: LoginSchema) => {
    setLoading(true);
    const { email, password } = data;
    const { data: loginData, error } = await supabase.auth.signInWithPassword({
      email: email.toLowerCase(),
      password,
    });
    if (error) {
      setLoading(false);
      return;
    }
    if (loginData) {
      router.push('/u');
      setLoading(false);
    }
  };

  return (
    <section className="bg-black min-h-screen flex flex-col items-center pt-8">
      <GoBackLink />
      <HeroInfo
        image="/assets/login/float_logo.svg"
        title="Bienvenido de vuelta! Simplemente manten ese ritmo"
        subtitle="Ingresa tu cuenta para continuar"
      />
      <form
        className="pt-8 flex flex-col items-center gap-8"
        onSubmit={handleSubmit(handleLoginForm)}
      >
        {loading ? (
          <Spinner />
        ) : (
          <>
            <EmailInput register={register} />
            <PassInput register={register} />
            {(errors.email || errors.password) && (
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                className="max-w-xs"
              >
                <p className="text-red-500 text-center w-fit mx-auto">
                  {errors.email?.message || errors.password?.message}
                </p>
              </motion.div>
            )}
          </>
        )}
        <FormActions loading={loading} isLogin />
      </form>
    </section>
  );
}
