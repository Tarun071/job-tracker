// src/store/favoritesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    jobs: [],
  },
  reducers: {
    addFavorite: (state, action) => {
      const exists = state.jobs.find((job) => job.id === action.payload.id);
      if (!exists) {
        state.jobs.push(action.payload);
      }
    },
    removeFavorite: (state, action) => {
      state.jobs = state.jobs.filter((job) => job.id !== action.payload);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

// Selectors
export const selectFavorites = (state) => state.favorites.jobs;
export const selectIsFavorite = (jobId) => (state) =>
  state.favorites.jobs.some((job) => job.id === jobId);

export default favoritesSlice.reducer;
