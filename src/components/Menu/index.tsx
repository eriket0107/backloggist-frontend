import { cn } from "@/utils";

import { menu } from "@/constants/menu";

import { AnimatePresence, motion } from "motion/react";

import { Image } from "@/components/Image";

import LogoText from "/backloggist-logo-text-256.webp";
import { Link, useLocation } from "@tanstack/react-router";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MenuFooter } from "../MenuFooter";
import { NavLink } from "../NavLink";

interface MenuStore {
  toggleOpenMenu: () => void;
  isMenuOpen: boolean;
}

export const useMenuStore = create(
  persist<MenuStore>(
    (set) => ({
      isMenuOpen: false,
      toggleOpenMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
    }),
    {
      name: "@backloggist:menu",
    }
  )
);

export const Menu = () => {
  const { isMenuOpen } = useMenuStore();
  const location = useLocation();

  return (
    <div
      className={cn(
        "md:flex flex-col md:flex-1 w-full h-full bg-gray-900 rounded-r-sm md:col-span-1 justify-center items-center"
      )}
    >
      {/*        Mobile menu      */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden flex flex-col flex-1 overflow-hidden w-full"
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
            <nav
              className="flex-1 w-full flex 
            flex-col items-center 
            justify-start px-6 py-8 gap-2"
            >
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
      <aside
        className="hidden  md:flex md:flex-1 overflow-hidden flex-1 w-full 
            flex-col items-center 
            justify-start px-6 py-8 gap-2"
      >
        <div className="p-4 md:flex flex-col hidden items-center">
          <Image
            className="md:w-[256px] md:h-[64px] w-[192px] h-[32px] mx-auto"
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
