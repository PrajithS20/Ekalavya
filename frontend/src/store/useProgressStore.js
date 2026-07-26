import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useProgressStore = create(
  persist(
    (set) => ({
      progress: 15, // Seed stage
      sidebarOpen: true,
      currentProfile: null,
      generatedProjects: [],

      increaseProgress: (value) =>
        set((state) => ({
          progress: Math.min(100, state.progress + value),
        })),

      setProgress: (value) =>
        set(() => ({
          progress: value,
        })),

      setProfile: (profile) => set({ currentProfile: profile }),
      setProjects: (projects) => set({ generatedProjects: projects }),
      deleteGeneratedProject: (projectId) => set((state) => ({ 
          generatedProjects: state.generatedProjects.filter(p => p.id !== projectId) 
      })),

      activeProjects: [],
      setActiveProjects: (projects) => set({ activeProjects: projects }),
      addActiveProject: (project) => set((state) => ({ activeProjects: [...state.activeProjects, project] })),

      toggleSidebar: () =>
        set((state) => ({
          sidebarOpen: !state.sidebarOpen,
        })),
    }),
    {
      name: "ekalavya-progress-storage",
    }
  )
);
