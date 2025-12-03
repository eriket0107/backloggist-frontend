import { useEffect, useState } from "react";
import { Image } from "./Image";
import { Progress } from "./ui/progress";
import { Particles } from "./ui/shadcn-io/particles";
import LogoMini from "/backloggist-logo-text-256.webp";
import { useLocation } from "@tanstack/react-router";
import { isPublicRoute } from "@/constants/public-routes";

const MIN_DELAY = 50;
const MAX_DELAY = 150;
const MAX_PROGRESS_SIMULATION = 95;

export const Loader = () => {
  const { pathname } = useLocation();
  const [progress, setProgress] = useState(13)

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const simulateProgress = () => {
      if (progress >= MAX_PROGRESS_SIMULATION) return;


      const increment = Math.random() * (20 / (progress + 10)) + 1;
      const delay = Math.random() * (MAX_DELAY - MIN_DELAY) + MIN_DELAY;

      const newProgress = Math.min(progress + increment, MAX_PROGRESS_SIMULATION);

      timer = setTimeout(() => {
        setProgress(newProgress);
      }, delay);
    };
    simulateProgress();
    return () => {
      setProgress(100);
      clearTimeout(timer)
    }
      ;
  }, [progress]);

  if (isPublicRoute(pathname)) {
    return null;
  }

  return (
    <div className="relative flex flex-col items-center justify-center h-dvh bg-theme">
      <Particles className="absolute inset-0" quantity={1000} staticity={100} />
      <div className="relative flex items-center justify-center">
        <Image
          src={LogoMini}
          alt="Logo Carregando"
          className="relative z-10 animate-pulse"
        />
      </div>
      <Progress className="relative z-100 w-[10%] animate-pulse" value={progress} />
    </div>
  );
};
