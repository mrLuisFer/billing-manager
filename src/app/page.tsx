"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MotionLink } from "@/shared/components/Motion";

interface ISlider {
  src: string;
  title: string;
  description?: string;
}

const welcomeSlider = [
  {
    src: "/assets/welcome/first.svg",
    title: "Diversificación del riesgo",
    description:
      "Reduce la vulnerabilidad y maximiza tu potencial de ganancias",
  },
  {
    src: "/assets/welcome/second.svg",
    title: "Inversiones inteligentes",
    description: "La clave para construir riqueza a largo plazo",
  },
  {
    src: "/assets/welcome/third.svg",
    title: "Presupuesto eficiente",
    description: "Controla tus gastos y alcanza tus metas financieras",
  },
];

export default function Home() {
  const [sliderIndex, setSliderIndex] = useState(0);
  const [activeSlider, setActiveSlider] = useState<ISlider>(
    welcomeSlider[sliderIndex],
  );
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    setActiveSlider(welcomeSlider[sliderIndex]);

    const params = Number(searchParams.get("params"));
    const validateParams: boolean | 0 = params && params <= 2 && params >= 0;
    if (validateParams) {
      setSliderIndex(params);
    }
  }, [searchParams, sliderIndex]);

  return (
    <main>
      <section className="bg-black h-screen overflow-x-hidden">
        <div
          className={`h-fit relative rounded-b-[150px] pt-[80px] pb-8
	${sliderIndex === 0 ? "bg-orange-300" : ""}
	${sliderIndex === 1 ? "bg-orange-400" : ""}
	${sliderIndex === 2 ? "bg-yellow-300" : ""}
	`}
        >
          <MotionLink
            initial={{
              opacity: 0,
              y: -100,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            href="/auth/login"
            className="w-fit no-underline select-none flex text-black items-center justify-center border-2 border-black absolute top-5 mx-auto left-0 right-0 rounded-xl p-0.5 px-4 hover:bg-neutral-950 hover:text-inherit transition"
          >
            Tap para iniciar sesion
          </MotionLink>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <Image
              className="relative mx-auto w-[200px] h-[200px]"
              src={activeSlider.src}
              alt={activeSlider.title}
              width={200}
              height={200}
              priority
            />
          </motion.div>
          <div className="flex items-center justify-center mt-6 gap-4">
            {welcomeSlider.map(({ src }, i) => (
              <MotionLink
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                key={src}
                className={`w-3  h-3 rounded-full cursor-pointer transition ${
                  sliderIndex === i ? "bg-black" : "bg-neutral-200 opacity-70"
                }`}
                href={`/?params=${i}`}
                onClick={() => {
                  setSliderIndex(i);
                }}
              />
            ))}
          </div>
        </div>
        <div className="text-white pt-6 px-6 flex flex-col items-center gap-6 h-fit">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="leading-7 text-2xl"
          >
            {activeSlider.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center max-w-xs"
          >
            {activeSlider.description}
          </motion.p>
          <button
            type="button"
            className={`border-2 transition border-t-yellow-300
			 ${sliderIndex === 1 ? "border-r-yellow-300 border-b-yellow-300" : ""} 
			 ${sliderIndex === 2 ? "border-yellow-300" : ""} 
			 transition w-fit h-fit rounded-full p-5 mx-auto active:scale-95`}
            onClick={() => {
              if (sliderIndex < welcomeSlider.length - 1) {
                setSliderIndex(sliderIndex + 1);
                router.push(`/?params=${sliderIndex + 1}`);
              } else {
                router.push("/auth/register");
              }
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-yellow-300 p-2 rounded-full flex items-center justify-center gap-2"
            >
              {sliderIndex === 2 && (
                <motion.p
                  initial={{
                    opacity: 0,
                    x: 20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  className="text-black font-bold"
                >
                  Registrate
                </motion.p>
              )}
              <svg
                width="25"
                height="25"
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M31.7469 33.5C31.5166 33.7146 31.3319 33.9733 31.2038 34.2608C31.0757 34.5483 31.0068 34.8587 31.0013 35.1734C30.9957 35.4881 31.0536 35.8007 31.1715 36.0925C31.2894 36.3843 31.4648 36.6494 31.6874 36.872C31.9099 37.0946 32.175 37.27 32.4669 37.3879C32.7587 37.5058 33.0713 37.5637 33.386 37.5581C33.7007 37.5526 34.0111 37.4837 34.2986 37.3556C34.5861 37.2275 34.8448 37.0428 35.0594 36.8125L45.2156 26.6563L46.875 25L45.2188 23.3438L35.0625 13.1875C34.6207 12.7604 34.0287 12.5238 33.4142 12.5289C32.7997 12.5339 32.2117 12.7801 31.777 13.2145C31.3422 13.6488 31.0954 14.2366 31.0898 14.8511C31.0842 15.4656 31.3201 16.0578 31.7469 16.5L37.9031 22.6563H5.46875C4.84715 22.6563 4.25101 22.9032 3.81147 23.3427C3.37193 23.7823 3.125 24.3784 3.125 25C3.125 25.6216 3.37193 26.2177 3.81147 26.6573C4.25101 27.0968 4.84715 27.3438 5.46875 27.3438H37.9031L31.7469 33.5Z"
                  fill="black"
                />
              </svg>
            </motion.div>
          </button>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-center text-sm mt-auto">
              Ya tienes una cuenta?{" "}
              <a href="/auth/login" className="text-yellow-200">
                Inicia sesion
              </a>
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
