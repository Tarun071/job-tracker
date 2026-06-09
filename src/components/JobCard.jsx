// ─────────────────────────────────────────────
//  components/JobCard.jsx
//  Displays one job application as a card
//  Props:
//    job      (object)   — single job data object
//    onEdit   (function) — called when Edit clicked
//    onDelete (function) — called when Delete clicked
// ─────────────────────────────────────────────

import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite, selectIsFavorite } from "../store/favoritesSlice";
import Badge from "./Badge";

export default function JobCard({ job, onEdit, onDelete }) {
  const dispatch    = useDispatch();
  const isFavorite  = useSelector(selectIsFavorite(job.id));

  function handleFavoriteToggle() {
    if (isFavorite) {
      dispatch(removeFavorite(job.id));
    } else {
      dispatch(addFavorite(job));
    }
  }

  return (
    <div style={{
      background: "#fdfdfd",
      border: "1px solid #6f89be",
      borderRadius: 14,
      padding: "16px 18px",
      display: "flex",
      flexDirection: "column",
      gap: 10,
      transition: "box-shadow 0.15s",
    }}>

      {/* ── Top row: company name + badge + favorite ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 15, color: "#111827" }}>
            {job.company}
          </div>
          <div style={{ fontSize: 13, color: "#6b7280", marginTop: 2 }}>
            {job.role}
          </div>
        </div>

        {/* Badge + Favorite star side by side */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Badge status={job.status} />
          <button
            onClick={handleFavoriteToggle}
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: 18,
              lineHeight: 1,
              padding: "2px 4px",
              color: isFavorite ? "#f59e0b" : "#d1d5db",
              transition: "color 0.15s, transform 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.25)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >
            {isFavorite ? "★" : "☆"}
          </button>
        </div>
      </div>

      {/* ── Meta row: location + date ── */}
      <div style={{ display: "flex", gap: 14, fontSize: 12, color: "#9ca3af", flexWrap: "wrap" }}>
        {job.location && <span>{job.location}</span>}
        {job.dateApplied && <span>{job.dateApplied}</span>}
      </div>

      {/* ── Notes (only if present) ── */}
      {job.notes && (
        <div style={{
          fontSize: 12,
          color: "#6b7280",
          background: "#f9fafb",
          borderLeft: "3px solid #d1d5db",
          borderRadius: "0 6px 6px 0",
          padding: "6px 10px",
          lineHeight: 1.5,
        }}>
          {job.notes}
        </div>
      )}

      {/* ── Job link (only if present) ── */}
      {job.jobLink && (
        <a
          href={job.jobLink}
          target="_blank"
          rel="noreferrer"
          style={{ fontSize: 12, color: "#2563eb", textDecoration: "none" }}
        >
          Website applied
        </a>
      )}

      {/* ── Action buttons ── */}
      <div style={{ display: "flex", gap: 8, marginTop: 2 }}>
        <button
          onClick={() => onEdit(job)}
          style={{
            flex: 1,
            fontSize: 12,
            padding: "7px 0",
            border: "1px solid #d1d5db",
            borderRadius: 8,
            cursor: "pointer",
            background: "transparent",
            color: "#374151",
            fontWeight: 500,
          }}
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(job.id)}
          style={{
            flex: 1,
            fontSize: 12,
            padding: "7px 0",
            border: "1px solid #fca5a5",
            borderRadius: 8,
            cursor: "pointer",
            background: "transparent",
            color: "#dc2626",
            fontWeight: 500,
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
