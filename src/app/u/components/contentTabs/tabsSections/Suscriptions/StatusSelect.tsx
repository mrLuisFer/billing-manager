import React from 'react';
import { motion } from 'framer-motion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface IStatusSelect {
  setStatus: (value: string) => void;
}

const statusList = [
  {
    label: 'Activo',
    value: 'active',
  },
  {
    label: 'Cancelada',
    value: 'canceled',
  },
];

export default function StatusSelect({ setStatus }: IStatusSelect) {
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
          Estado de la suscripcion
        </span>
        <Select
          onValueChange={(value: string) => setStatus(value)}
          name="status"
          required
        >
          <SelectTrigger id="icon" className="bg-[hsl(var(--background));]">
            <SelectValue placeholder="Estado de la suscripcion" />
          </SelectTrigger>
          <SelectContent>
            {statusList.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                <div className="flex items-center justify-start gap-2">
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
