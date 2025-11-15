import { Outlet } from "@tanstack/react-router";

import { Particles } from "@/components/ui/shadcn-io/particles";

import TypingText from "@/components/ui/shadcn-io/typing-text";
import LogoFull from "/backloggist-logo-bg-text-512.webp";
import LogoText from "/backloggist-logo-text-256.webp";
import { useAuthPage } from "./hooks/useAuthPage";
import { Image } from "@/components/Image";

export const AuthPage = () => {
  useAuthPage();

  return (
    <div className="min-h-dvh grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 flex-col items-center justify-center md:bg-gray-100">
      <div className="hidden md:flex bg-linear-to-tl from-gray-900 to-gray-950 min-h-dvh  items-center justify-center lg:col-span-2 md:col-span-1">
        <div className="relative flex h-screen w-full  items-center justify-center overflow-hidden  md:shadow-xl">
          <Image
            src={LogoFull}
            alt="Backloggist Logo"
            width={512}
            height={512}
            loading="lazy"
            fetchPriority="high"
            decoding="async"
            className="rounded-full shadow-[#1d2537] shadow-2xl w-[300px] z-100"
          />
          <Particles
            className="absolute inset-0"
            quantity={1000}
            ease={80}
            color="#ffffff"
            refresh
          />
        </div>
      </div>
      <div className="md:bg-gray-100 bg-gray-900 min-h-dvh flex flex-col items-center justify-center p-6 w-full lg:col-span-1 gap-12">
        <div className="w-full flex flex-col items-center">
          <Image
            src={LogoText}
            alt="Backloggist Logo"
            width={512}
            height={512}
            loading="lazy"
            fetchPriority="high"
            decoding="async"
            className="md:hidden w-[256px] z-100"
          />
          <TypingText
            text={["Organize", "Planeje", "Execute"]}
            typingSpeed={100}
            pauseDuration={2000}
            showCursor={true}
            cursorCharacter="|"
            className="text-4xl font-bold bg-linear-to-r from-gray-400 to-slate-100  md:bg-linear-to-r md:from-blue-900 md:to-[#1d2537] text-transparent bg-clip-text mb-6"
            variableSpeed={{ min: 20, max: 120 }}
          />
          <Outlet />
          <Particles
            className="absolute inset-0 md:hidden"
            quantity={1000}
            ease={80}
            color="#ffffff"
            refresh
          />
        </div>
      </div>
    </div>
  );
};
