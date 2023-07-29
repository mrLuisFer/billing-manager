import { AnimatePresence, motion } from 'framer-motion';
import useSessionStore from '@/store/useSessionStore';
import { useEffect, useState } from 'react';
import { TbEdit } from 'react-icons/tb';
import { MdOutlineCancel } from 'react-icons/md';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import supabase from '@/lib/supabase';
import fetchBalance from '../../helpers/fetchBalance';

const balanceSchema = yup.object().shape({
  balance: yup.number().required('El balance es requerido'),
});
type IBalanceSchema = yup.InferType<typeof balanceSchema>;

export default function Balance() {
  const [balance, setBalance] = useState<number>(0);
  const session = useSessionStore((state) => state.session);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm<IBalanceSchema>({
    resolver: yupResolver(balanceSchema) as any,
    defaultValues: {
      balance: undefined,
    },
  });
  const balanceValue = useWatch({
    control,
    name: 'balance',
    defaultValue: undefined,
  });

  const onSubmitBalance = async (data: IBalanceSchema) => {
    const balanceSubmitResponse = await supabase
      .from('users')
      .update({
        balance: data.balance,
      })
      .eq('id', session?.user.id)
      .select('balance')
      .single();

    if (balanceSubmitResponse.error) {
      return;
    }

    reset();
    setIsEditing(false);
    if (balanceSubmitResponse.data) {
      setBalance(balanceSubmitResponse.data.balance!);
    }
  };

  useEffect(() => {
    (async () => {
      const balanceRes = await fetchBalance(session?.user.id as string);
      if (balanceRes || balanceRes === 0) {
        setBalance(balanceRes);
      }
    })();
  }, [session?.user.id]);

  supabase
    .channel('custom-all-channel')
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'users' },
      (payload: any) => {
        console.log(payload);
        const newBalance: number = payload.new.balance;
        setBalance(newBalance);
      },
    )
    .subscribe();

  if (isEditing) {
    return (
      <AnimatePresence>
        <motion.form onSubmit={handleSubmit(onSubmitBalance)}>
          <motion.p
            className="text-neutral-300 text-sm"
            initial={{
              opacity: 0,
              x: -50,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: -50,
            }}
          >
            Agrega un nuevo balance
          </motion.p>
          <div className="flex gap-4 mt-2 items-center">
            <motion.div
              initial={{
                opacity: 0,
                x: -50,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: -50,
              }}
              transition={{
                delay: 0.1,
              }}
            >
              <Input
                className="w-[120px]"
                type="number"
                inputMode="numeric"
                placeholder={`$ ${balance}.00`}
                {...register('balance')}
              />
            </motion.div>
            <motion.div
              initial={{
                opacity: 0,
                x: 50,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{ opacity: 0, x: 50 }}
              className="flex items-center gap-2"
            >
              <Button
                type="submit"
                disabled={
                  Number(balanceValue) === 0 || balanceValue === undefined
                }
              >
                Guardar
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="icon"
                onClick={() => {
                  setIsEditing(false);
                  reset();
                }}
              >
                <MdOutlineCancel size="1.3rem" />
              </Button>
            </motion.div>
          </div>
          <p className="text-xs text-red-500 w-[300px] truncate">
            {errors.balance?.message}
          </p>
          <motion.p
            initial={{
              opacity: 0,
              y: 50,
            }}
            animate={{
              opacity: 0.4,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: 50,
            }}
            className="text-xs opacity-40 w-[200px] mt-2"
          >
            Si no se modifica el balance, recarga la página.
          </motion.p>
        </motion.form>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
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
          className="text-3xl font-bold pt-2 flex items-center gap-2"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
        >
          $ {balance}.00
          <motion.button
            whileTap={{
              scale: 0.95,
            }}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            className="text-sm p-2 rounded-full bg-[var(--primary-dark)] hover:shadow-md"
            onClick={() => setIsEditing(true)}
          >
            <TbEdit />
          </motion.button>
        </motion.h1>
      </motion.div>
    </AnimatePresence>
  );
}
