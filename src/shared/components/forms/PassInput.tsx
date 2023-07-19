import { RegisterSchema } from "@/types/register/formSchema";
import { UseFormRegister } from "react-hook-form";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import InputHightlight from "./InputHightlight";

export default function PassInput({
  register,
}: {
  register: UseFormRegister<RegisterSchema>;
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <InputHightlight
      icon="/assets/register/pass_icon.svg"
      name="password"
      inputProps={{
        type: showPassword ? "text" : "password",
        placeholder: showPassword ? "contrasena" : "******",
        ...register("password"),
      }}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.button
              initial={{
                x: 20,
                opacity: 0,
              }}
              animate={{
                x: 0,
                opacity: 1,
              }}
              whileTap={{
                scale: 0.95,
              }}
              whileHover={{
                scale: 0.95,
              }}
              onClick={() => setShowPassword(!showPassword)}
              type="button"
            >
              {showPassword ? "🫣" : "👀"}
            </motion.button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Mostrar contraseña</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </InputHightlight>
  );
}
