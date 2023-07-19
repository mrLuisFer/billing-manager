import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BsArrowUpRight } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { MotionLink } from '@/shared/components/Motion';
import useSessionStore from '@/store/useSessionStore';
import MenuActions from './MenuActions';

export default function HomeHeader() {
  const session = useSessionStore((state) => state.session);
  const userName = session?.user.user_metadata.name;
  const shortName = userName?.split('')[0];

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
          <AvatarFallback>{shortName}</AvatarFallback>
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
          {userName && <span className="capitalize">{userName}</span>}
          <BsArrowUpRight size="0.9rem" />
        </motion.div>
      </MotionLink>
      <section>
        <MenuActions />
      </section>
    </header>
  );
}
