import { lazy } from "react";
import { LoginForm } from "@/components/LoginForm";
import LogoFull from "../../public/logo512.png";

const TypingText = lazy(() => import("@/components/ui/shadcn-io/typing-text"));
const Particles = lazy(() =>
	import("@/components/ui/shadcn-io/particles").then((module) => ({
		default: module.Particles,
	})),
);

export const LoginPage = () => {
	return (
		<div className="min-h-dvh grid  lg:grid-cols-3 md:grid-cols-2 grid-cols-1 flex-col items-center justify-center md:bg-secondary">
			<div className="hidden md:flex bg-linear-to-tl from-gray-900 to-gray-950 min-h-dvh  items-center justify-center lg:col-span-2 md:col-span-1">
				<div className="relative flex h-screen w-full  items-center justify-center overflow-hidden  md:shadow-xl">
					<img
						src={LogoFull}
						alt="Logo img"
						className="rounded-full shadow-[#1d2537] shadow-2xl  w-[300px] z-100"
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
			<div className="md:bg-secondary bg-gray-900 min-h-dvh flex flex-col items-center justify-center p-6 w-full lg:col-span-1 gap-12">
				<div className="w-full flex flex-col items-center">
					<TypingText
						text={["Organize", "Planeje", "Faça"]}
						typingSpeed={100}
						pauseDuration={2000}
						showCursor={true}
						cursorCharacter="|"
						className="text-4xl font-bold bg-secondary md:bg-linear-to-r from-blue-900 to-[#1d2537] text-transparent bg-clip-text mb-6"
						variableSpeed={{ min: 20, max: 120 }}
					/>
					<LoginForm />
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
