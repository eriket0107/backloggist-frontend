import { cn } from "@/utils";

import { menu } from "@/constants/menu";

import { AnimatePresence, motion } from "motion/react";

import { Image } from "@/components/Image";

import LogoText from "/backloggist-logo-text-256.webp";
import { useLocation } from "@tanstack/react-router";

import { MenuFooter } from "./MenuFooter";
import { NavLink } from "./NavLink";

import { useMenuStore } from "@/stores/useMenuStore";

export const Menu = () => {
  const { isMenuOpen } = useMenuStore();
  const location = useLocation();

  return (
    <div
      className={cn(
        `h-full w-full flex-col items-center justify-center rounded-r-sm bg-gray-900 md:col-span-1 md:flex md:flex-1`,
      )}
    >
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
                  isSelected={location.pathname === to}
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
        <div className="hidden flex-col items-center p-4 md:flex">
          <Image
            className="mx-auto h-[32px] w-[192px] md:h-[64px] md:w-[256px]"
            alt="Backlog Text logo"
            src={LogoText}
          />
        </div>
        <nav>
          {menu.map(({ Icon, label, to }) => (
            <NavLink
              icon={Icon}
              key={to}
              to={to}
              isSelected={location.pathname === to}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <MenuFooter />
      </aside>
    </div>
  );
};
