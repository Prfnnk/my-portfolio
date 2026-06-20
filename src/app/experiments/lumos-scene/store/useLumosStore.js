import { create } from 'zustand';

export const useLumosStore = create((set) => ({
  // State
  isLumosActive: false,

  // Actions
  toggleLumos: () =>
    set((state) => ({ isLumosActive: !state.isLumosActive })),
}));
