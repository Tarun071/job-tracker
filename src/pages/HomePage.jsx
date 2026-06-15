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
  const [sortBy, setSortBy]             = useState("newest");   // ← NEW

  // ── Sort logic ──
  function getSortedJobs(jobList) {
    const sorted = [...jobList];
    if (sortBy === "newest")  return sorted.sort((a, b) => new Date(b.dateApplied) - new Date(a.dateApplied));
    if (sortBy === "oldest")  return sorted.sort((a, b) => new Date(a.dateApplied) - new Date(b.dateApplied));
    if (sortBy === "company") return sorted.sort((a, b) => a.company.localeCompare(b.company));
    if (sortBy === "status")  return sorted.sort((a, b) => a.status.localeCompare(b.status));
    return sorted;
  }

  const filteredJobs = getSortedJobs(
    jobs.filter((job) => {
      const matchesStatus = activeFilter === "All" || job.status === activeFilter;
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        job.company.toLowerCase().includes(q)  ||
        job.role.toLowerCase().includes(q)     ||
        job.location.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    })
  );

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "28px 20px", backgroundColor: "#111827" }}>

      {/* ── Page heading ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "#111827" }}>
            Dashboard
          </h1>
          <p style={{ margin: "5px 0 0", fontSize: 13, color: "#6b7280" }}>
            {jobs.length} applications
          </p>
        </div>
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

      {/* ── Sort dropdown ── */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            background: "#1e2a3a",
            color: "#94a3b8",
            border: "1px solid #2d3f55",
            borderRadius: 8,
            padding: "7px 12px",
            fontSize: 13,
            cursor: "pointer",
            outline: "none",
          }}
        >
          <option value="newest">📅 Newest First</option>
          <option value="oldest">📅 Oldest First</option>
          <option value="company">🔤 Company (A–Z)</option>
          <option value="status">🏷️ Status</option>
        </select>
      </div>

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
