import { Input, InputProps } from '@/components/ui/input';
import { HTMLMotionProps, motion } from 'framer-motion';

export default function InputCard({
  name,
  inputProps,
  label,
  containerAnimation,
  errorMessage = undefined,
  helper = undefined,
}: {
  name: string;
  inputProps: InputProps & React.RefAttributes<HTMLInputElement>;
  label: string;
  containerAnimation?: HTMLMotionProps<'div'>;
  errorMessage?: string;
  helper?: string;
}) {
  return (
    <motion.div className="flex flex-col gap-1 group" {...containerAnimation}>
      <label htmlFor={name}>
        <span className="font-semibold text-sm opacity-60 group-focus-within:opacity-100 transition">
          {label}
        </span>
      </label>
      <Input
        id={name}
        name={name}
        className="tracking-wider placeholder:tracking-wider transition text-[1rem]"
        {...inputProps}
      />
      {helper && (
        <motion.span className="text-sm opacity-30 tracking-wide">
          {helper}
        </motion.span>
      )}
      {errorMessage && (
        <motion.p
          className="text-sm text-red-400 opacity-60 group-focus-within:opacity-100 transition"
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
        >
          {errorMessage}
        </motion.p>
      )}
    </motion.div>
  );
}
