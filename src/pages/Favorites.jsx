// src/pages/Favorites.jsx
import React from "react";
import { useSelector } from "react-redux";
import { selectFavorites } from "../store/favoritesSlice";
import JobCard from "../components/JobCard";

const Favorites = () => {
  const favorites = useSelector(selectFavorites);

  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <h2 style={{ color: "#e2e8f0", marginBottom: "1.5rem" }}>
        Favorite Jobs
        <span
          style={{
            marginLeft: "0.6rem",
            fontSize: "0.9rem",
            color: "#64748b",
            fontWeight: 400,
          }}
        >
          ({favorites.length})
        </span>
      </h2>

      {favorites.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "4rem 2rem",
            color: "#475569",
            background: "#1e2a3a",
            borderRadius: "10px",
            border: "1px dashed #2d3f55",
          }}
        >
          <p style={{ fontSize: "2.5rem", margin: "0 0 0.5rem" }}>☆</p>
          <p style={{ fontSize: "1rem" }}>No favorites yet.</p>
          <p style={{ fontSize: "0.85rem", marginTop: "0.25rem" }}>
            Click the ★ on any job card to save it here.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1rem",
          }}
        >
          {favorites.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
