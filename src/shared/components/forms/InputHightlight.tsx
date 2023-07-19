import Image from 'next/image';
import { type ReactNode, type InputHTMLAttributes } from 'react';
import { motion } from 'framer-motion';

interface InputHightlightProps {
  icon?: string | ReactNode;
  name: string;
  inputProps: InputHTMLAttributes<HTMLInputElement>;
  children?: ReactNode;
}
export default function InputHightlight({
  icon = undefined,
  name,
  inputProps,
  children,
}: InputHightlightProps) {
  return (
    <div className="flex items-center justify-start gap-2 mx-auto w-full">
      {icon && (
        <motion.label
          initial={{
            x: -10,
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          htmlFor={name}
        >
          {typeof icon === 'string' ? (
            <Image src={icon} role="img" alt={name} width={30} height={30} />
          ) : (
            <div className="w-[30px] h-[30px]">{icon}</div>
          )}
        </motion.label>
      )}
      <motion.div
        initial={{
          x: 10,
          opacity: 0,
        }}
        animate={{
          x: 0,
          opacity: 1,
        }}
      >
        <input
          id={name}
          name={name}
          aria-labelledby="input-label"
          aria-expanded="false"
          aria-controls="input-options"
          {...inputProps}
          role="combobox"
          aria-autocomplete="none"
          autoComplete="off"
          className="border-none outline-none bg-black text-white pl-2 w-full autofill:bg-black autofill:focus-within:bg-black max-w-[220px]"
        />
      </motion.div>
      {children}
    </div>
  );
}
