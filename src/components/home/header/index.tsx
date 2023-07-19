import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Toggle } from "@/components/ui/toggle";
import { BsArrowUpRight } from "react-icons/bs";
import MenuActions from "@/components/home/header/MenuActions";
import { motion } from "framer-motion";

export default function HomeHeader() {
  return (
    <header className="p-4 flex justify-between items-center">
      <motion.button
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
        Luis
        <BsArrowUpRight size={"0.9rem"} />
      </motion.button>
      <section>
        <MenuActions />
      </section>
    </header>
  );
}
