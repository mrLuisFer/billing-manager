import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BsArrowUpRight } from "react-icons/bs";
import { motion } from "framer-motion";
import { MotionLink } from "@/shared/components/Motion";
import MenuActions from "./MenuActions";

export default function HomeHeader() {
  return (
    <header className="p-4 flex justify-between items-center">
      <MotionLink
        href="/u/profile"
        initial={{
          y: -100,
        }}
        animate={{
          y: 0,
        }}
        className="flex items-center pr-2 bg-[var(--primary-dark)] w-fit rounded-full gap-2"
      >
        <Avatar>
          <AvatarImage src="https://github.com/mrluisfer.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <motion.div
          initial={{
            x: -100,
          }}
          animate={{
            x: 0,
          }}
          className="flex items-center gap-2"
        >
          <span>Luis</span>
          <BsArrowUpRight size="0.9rem" />
        </motion.div>
      </MotionLink>
      <section>
        <MenuActions />
      </section>
    </header>
  );
}
