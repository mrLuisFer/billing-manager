import { RegisterSchema } from "@/types/register/formSchema";
import { UseFormRegister } from "react-hook-form";
import InputHightlight from "./InputHightlight";
import { useState } from "react";
import { motion } from "framer-motion";

export default function PassInput({
  register,
}: {
  register: UseFormRegister<RegisterSchema>;
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <InputHightlight
      icon={"/assets/register/pass_icon.svg"}
      name="password"
      inputProps={{
        type: showPassword ? "text" : "password",
        placeholder: showPassword ? "contrasena" : "******",
        ...register("password"),
      }}
    >
      <motion.div
        initial={{
          x: 20,
          opacity: 0,
        }}
        animate={{
          x: 0,
          opacity: 1,
        }}
      >
        <motion.button
          whileTap={{
            scale: 0.95,
          }}
          whileHover={{
            scale: 0.95,
          }}
          type="button"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "🫣" : "👀"}
        </motion.button>
      </motion.div>
    </InputHightlight>
  );
}
