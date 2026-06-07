// ─────────────────────────────────────────────
//  pages/HomePage.jsx
// ─────────────────────────────────────────────

import { useState } from "react";
import StatsBar    from "../components/StatsBar";
import FilterBar   from "../components/FilterBar";
import JobCard     from "../components/JobCard";

export default function HomePage({ jobs, onEdit, onDelete, onNavigate }) {
  const [search, setSearch]             = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredJobs = jobs.filter((job) => {
    const matchesStatus = activeFilter === "All" || job.status === activeFilter;
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      job.company.toLowerCase().includes(q)  ||
      job.role.toLowerCase().includes(q)     ||
      job.location.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "28px 20px" }}>

      {/* ── Page heading + Add Job button ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "#111827" }}>
            Dashboard
          </h1>
          <p style={{ margin: "5px 0 0", fontSize: 13, color: "#6b7280" }}>
            {jobs.length} total applications
          </p>
        </div>

        <button
          onClick={() => onNavigate("add")}
          style={{
            background: "#1d4ed8",
            color: "#fff",
            border: "none",
            borderRadius: 9,
            padding: "10px 20px",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          + Add Job
        </button>
      </div>

      {/* ── Stats bar ── */}
      <StatsBar jobs={jobs} />

      {/* ── Search + Filter ── */}
      <FilterBar
        search={search}
        onSearch={setSearch}
        activeFilter={activeFilter}
        onFilter={setActiveFilter}
      />

      {/* ── Job cards grid ── */}
      {filteredJobs.length === 0 ? (
        <div style={{
          textAlign: "center",
          padding: "52px 20px",
          color: "#9ca3af",
          fontSize: 14,
          border: "1.5px dashed #e5e7eb",
          borderRadius: 14,
        }}>
          {jobs.length === 0
            ? "No applications yet — click \"+ Add Job\" to get started!"
            : "No results match your search or filter."}
        </div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
          gap: 14,
        }}>
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
