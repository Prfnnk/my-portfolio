import { create } from 'zustand';

export const useTransitionStore = create((set) => ({
  isActive: false,
  label: '',
  startTransition: (label) => set({ isActive: true, label }),
  endTransition: () => set({ isActive: false }),
}));
