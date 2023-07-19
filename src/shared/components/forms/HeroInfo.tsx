import Image from 'next/image';
import { motion } from 'framer-motion';

export default function HeroInfo({
  image,
  title,
  subtitle,
  loading,
}: {
  image: string;
  title: string;
  subtitle: string;
  loading?: boolean;
}) {
  return (
    <div className="flex justify-center items-center flex-col gap-4 pt-9">
      <motion.div
        initial={{
          opacity: 0,
          scale: 0,
          y: 50,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        className={loading ? 'animate-pulse' : ''}
      >
        <Image
          src={image}
          alt={title}
          className="w-[100px] h-[100px]"
          aria-label={subtitle}
          width={100}
          height={100}
          draggable={false}
          priority
        />
      </motion.div>
      <motion.h2
        initial={{
          opacity: 0,
          y: 50,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="text-white font-semibold text-xl text-center flex flex-row flex-wrap justify-center max-w-xs"
      >
        {title}
      </motion.h2>
      <motion.p
        initial={{
          opacity: 0,
          y: 50,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="text-white text-center w-[200px] text-xs opacity-40 pt-2 max-w-xs"
      >
        {subtitle}
      </motion.p>
    </div>
  );
}
