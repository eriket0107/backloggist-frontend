import { cn } from "@/utils";

import { menu } from "@/constants/menu";

import { AnimatePresence, motion } from "motion/react";

import { Image } from "@/components/Image";

import LogoText from "/backloggist-logo-text-256.webp";
import { useLocation, useNavigate, } from "@tanstack/react-router";

import { MenuFooter } from "./MenuFooter";
import { NavLink } from "./NavLink";

import { useMenuStore } from "@/stores/useMenuStore";
import { Particles } from "./ui/shadcn-io/particles";
import { isRouteSelected } from "@/utils/selected-routed";
import { normalizePath } from "@/utils/normalize-path"

export const Menu = () => {
  const { isMenuOpen } = useMenuStore();
  const location = useLocation()
  const navigate = useNavigate();

  const handleNavigate = (to: string) => {
    navigate({ to });
  }

  return (
    <div
      className={cn(
        `h-full w-full flex-col items-center justify-center rounded-r-sm bg-gray-900 md:col-span-1 md:flex md:flex-1 md:rounded-tr-sm`,
      )}
    >
      <Particles className="absolute inset-0" quantity={500} staticity={100} />
      {/*        Mobile menu      */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="flex w-full flex-1 flex-col overflow-hidden md:hidden"
            key="mobile-menu"
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
          >
            <nav className="flex w-full flex-1 flex-col items-center justify-start gap-2 px-6 py-8">
              {menu.map(({ Icon, label, to }) => (
                <NavLink
                  icon={Icon}
                  key={to}
                  to={to}
                  isSelected={isRouteSelected({ to, location, normalizePath })}
                >
                  {label}
                </NavLink>
              ))}
            </nav>
            <div className="md:hidden">
              <MenuFooter />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/*        Desktop menu         */}
      <aside className="hidden flex-1 flex-col items-center justify-start gap-2 overflow-hidden px-6 py-8 md:flex md:flex-1">
        <motion.button
          whileTap={{
            scale: 1.02,
            transition: { duration: 0.1 }
          }}
          whileHover={{
            scale: 0.98,
            transition: { duration: 0.1 }
          }}
          onClick={() => handleNavigate("/dashboard")}
          className="hidden flex-col items-center p-4 md:flex">
          <Image
            className="mx-auto h-8 w-48 md:h-16 md:w-[256px]"
            alt="Backlog Text logo"
            src={LogoText}
          />
        </motion.button>
        <nav>
          {menu.map(({ Icon, label, to }) => (
            <NavLink
              icon={Icon}
              key={to}
              to={to}
              isSelected={isRouteSelected({ to, location, normalizePath })}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <MenuFooter />
      </aside>
    </div >
  );
};
