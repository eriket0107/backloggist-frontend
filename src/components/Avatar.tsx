import type { User } from "@/types/entities";
import { cn } from "@/utils";
import { memo } from "react";
import { Image } from "./Image";

interface AvatarProps {
  name: User["name"];
  className?: string;
  src?: string;
}

export const Avatar = memo(({ name, className, src }: AvatarProps) => {
  const firstLetter = name[0].toUpperCase();
  const secondLetter = name[1].toUpperCase();

  return (
    <span
      className={cn(
        "bg-gray-900 border-2 p-1 rounded-full w-[40px] h-[40px] flex items-center justify-center",
        className
      )}
    >
      {src ? (
        <Image src={src} alt={`Imagem de perfil de ${name} `} />
      ) : (
        <p className="text-gray-50 text-xs">
          {firstLetter}
          {secondLetter}
        </p>
      )}
    </span>
  );
});
