import { MotionLink } from '../Motion';

export default function GoBackLink() {
  return (
    <MotionLink
      initial={{
        opacity: 0,
        y: -100,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      href="/?params=2"
      className="text-white mx-auto px-4 py-2 w-fit border-2 rounded-xl hover:scale-95 active:scale-95"
      role="link"
    >
      Regresar
    </MotionLink>
  );
}
