import { create } from 'zustand';

export const useInterface = create((set) => ({
  // States
  selectedPlant: { id: 'carrot', color: '#ff6600' },
  action: 'plant', // 'plant', 'water', 'harvest'
  basketPosition: null,
  harvestedCounts: {
    carrot: 0,
    radish: 0,
    beet: 0,
  },

  // Set states
  setSelectedPlant: (plant) => set({ selectedPlant: plant }),
  setAction: (action) => set({ action: action }),
  setBasketPosition: (rect) => set({ basketPosition: rect }),

  incrementHarvest: (plantType) =>
    set((state) => ({
      harvestedCounts: {
        ...state.harvestedCounts,
        [plantType]: (state.harvestedCounts[plantType] || 0) + 1,
      },
    })),
}));
