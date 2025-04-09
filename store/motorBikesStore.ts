import { create } from "zustand";

interface MotorbikesState {
  motorbikes: any[];
  loading: boolean;
  error: string | null;
  setMotorbikes: (motorbikes: any[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useMotorbikesStorePublic = create<MotorbikesState>((set) => ({
  motorbikes: [],
  loading: true,
  error: null,
  setMotorbikes: (motorbikes) => set({ motorbikes }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
