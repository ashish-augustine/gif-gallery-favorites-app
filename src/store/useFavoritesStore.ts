
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Gif } from '../types/gif';

interface FavoritesState {
  favorites: Gif[];
  addFavorite: (gif: Gif) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (gif) => set((state) => {
        if (state.favorites.some((fav) => fav.id === gif.id)) {
          return state;
        }
        return { favorites: [...state.favorites, gif] };
      }),
      removeFavorite: (id) => set((state) => ({
        favorites: state.favorites.filter((gif) => gif.id !== id),
      })),
      isFavorite: (id) => get().favorites.some((gif) => gif.id === id),
    }),
    {
      name: 'gif-favorites-storage',
    }
  )
);
