import { Input, InputProps } from '@/components/ui/input';
import { HTMLMotionProps, motion } from 'framer-motion';

export default function InputCard({
  name,
  inputProps,
  label,
  containerAnimation,
}: {
  name: string;
  inputProps: InputProps & React.RefAttributes<HTMLInputElement>;
  label: string;
  containerAnimation?: HTMLMotionProps<'div'>;
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
        className="tracking-wider placeholder:tracking-wider transition"
        {...inputProps}
      />
    </motion.div>
  );
}
