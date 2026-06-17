// src/store/favoritesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",

  // Load from localStorage on startup
  initialState: JSON.parse(localStorage.getItem("favorites")) || [],

  reducers: {
    addFavorite: (state, action) => {
      const exists = state.find((job) => job.id === action.payload.id);
      if (!exists) {
        state.push(action.payload);
        localStorage.setItem("favorites", JSON.stringify(state));
      }
    },

    removeFavorite: (state, action) => {
      const updated = state.filter((job) => job.id !== action.payload);
      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

// Selectors
export const selectFavorites = (state) => state.favorites;
export const selectIsFavorite = (jobId) => (state) =>
  state.favorites.some((job) => job.id === jobId);

export default favoritesSlice.reducer;