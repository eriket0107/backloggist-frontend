import { create } from "zustand";
import { persist } from "zustand/middleware";

interface MenuStore {
  toggleOpenMenu: () => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void
}


export const useMenuStore = create(
  persist<MenuStore>(
    (set) => ({
      isMenuOpen: false,
      toggleOpenMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
      setIsMenuOpen: (value: boolean) => set(() => ({ isMenuOpen: value }))
    }),
    {
      name: "@backloggist:menu",
    },
  ),
);
