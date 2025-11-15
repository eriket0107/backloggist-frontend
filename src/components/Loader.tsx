import LogoMini from "/backloggist-logo-bg-text-192.webp";

export const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="relative flex items-center justify-center">
        <img
          src={LogoMini}
          alt="Logo Carregando"
          className="relative z-10 animate-pulse"
          height={75}
          width={75}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-[75px] h-[75px] rounded-full border-2 border-blue-500/30 animate-[ping_1.5s_ease-in-out_infinite]" />
          <div className="absolute w-[75px] h-[75px] rounded-full border-2 border-blue-500/20 animate-[ping_1.5s_ease-in-out_1.5s_infinite]" />
        </div>
      </div>
    </div>
  );
};
