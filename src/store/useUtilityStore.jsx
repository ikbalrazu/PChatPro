import { create } from "zustand";

export const useUtilityStore = create((set)=>({
    currentPage: 'conversation',
    sidebarVisible: true,
    toggleSidebar: (isVisible) => set({ sidebarVisible: isVisible }),
    navigate: (page) => set({ currentPage: page }),
}))