import React from 'react';
import { motion } from 'framer-motion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import SelectIcon from '../../contentTabs/tabsSections/SelectIcon';

interface IInputSelect {
  items: Array<{
    value: string;
    label: string;
  }>;
  label: string;
  setValue: (value: string) => void;
  name: string;
}

export default function InputSelect({
  items,
  label,
  setValue,
  name,
}: IInputSelect) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 50,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        delay: 0.2,
      }}
    >
      <label htmlFor="icon" className="font-semibold transition group">
        <span className="text-sm opacity-60 group-focus-within:opacity-100">
          {label}
        </span>
        <Select
          onValueChange={(value: string) => setValue(value)}
          name={name}
          required
        >
          <SelectTrigger id="icon" className="bg-[hsl(var(--background));]">
            <SelectValue placeholder={label} />
          </SelectTrigger>
          <SelectContent>
            {items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                <div className="flex items-center justify-start gap-2">
                  <SelectIcon iconName={item.value} />
                  {item.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </label>
    </motion.div>
  );
}
