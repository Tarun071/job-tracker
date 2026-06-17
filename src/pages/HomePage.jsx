// ─────────────────────────────────────────────
//  pages/HomePage.jsx
// ─────────────────────────────────────────────

import { useState } from "react";
import StatsBar  from "../components/StatsBar";
import FilterBar from "../components/FilterBar";
import JobCard   from "../components/JobCard";

export default function HomePage({ jobs, onEdit, onDelete, onNavigate }) {
  const [search,       setSearch]       = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [sortBy,       setSortBy]       = useState("newest");

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
    <div className="home-page">

      {/* Header */}
      <div className="home-page__header">
        <div>
          <h1 className="home-page__title">Dashboard</h1>
          <p className="home-page__count">{jobs.length} applications</p>
        </div>
      </div>

      {/* Stats */}
      <StatsBar jobs={jobs} />

      {/* Filter */}
      <FilterBar
        search={search}
        onSearch={setSearch}
        activeFilter={activeFilter}
        onFilter={setActiveFilter}
      />

      {/* Sort */}
      <div className="home-page__sort">
        <select
          className="home-page__sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="newest">📅 Newest First</option>
          <option value="oldest">📅 Oldest First</option>
          <option value="company">🔤 Company (A–Z)</option>
          <option value="status">🏷️ Status</option>
        </select>
      </div>

      {/* Job cards */}
      {filteredJobs.length === 0 ? (
        <div className="home-page__empty">
          {jobs.length === 0
            ? 'No applications yet — click "+ Add Job" to get started!'
            : "No results match your search or filter."}
        </div>
      ) : (
        <div className="home-page__grid">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  );
}