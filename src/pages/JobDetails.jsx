// src/pages/JobDetails.jsx
import { useParams, useNavigate } from "react-router-dom";

function JobDetails({ jobs }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const job = jobs.find((j) => String(j.id) === String(id));

  if (!job) {
    return (
      <div style={{ textAlign: "center", padding: "80px 20px", color: "#94a3b8" }}>
        <h2>Job not found</h2>
        <button onClick={() => navigate("/")} style={{
          marginTop: 16, padding: "10px 20px", background: "#3b82f6",
          color: "#fff", border: "none", borderRadius: 8, cursor: "pointer"
        }}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  const statusColors = {
    Applied: "#3b82f6", Interview: "#f59e0b",
    Offer: "#10b981", Rejected: "#ef4444",
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: "0 20px" }}>

      {/* Back button */}
      <button onClick={() => navigate("/")} style={{
        background: "transparent", border: "none",
        color: "#94a3b8", cursor: "pointer", fontSize: 14,
        marginBottom: 20, display: "flex", alignItems: "center", gap: 6,
      }}>
        ← Back to Dashboard
      </button>

      {/* Card */}
      <div style={{
        background: "#1e2a3a", border: "1px solid #2d3f55",
        borderRadius: 16, padding: 28,
      }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: "#f1f5f9", margin: 0 }}>
              {job.company}
            </h1>
            <p style={{ fontSize: 15, color: "#94a3b8", marginTop: 4 }}>{job.role}</p>
          </div>
          <span style={{
            background: statusColors[job.status] || "#64748b",
            color: "#fff", fontSize: 12, fontWeight: 600,
            padding: "4px 12px", borderRadius: 20,
          }}>
            {job.status}
          </span>
        </div>

        {/* Divider */}
        <hr style={{ border: "none", borderTop: "1px solid #2d3f55", margin: "0 0 20px" }} />

        {/* Details */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

          {job.location && (
            <div>
              <p style={{ fontSize: 11, color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>Location</p>
              <p style={{ fontSize: 14, color: "#e2e8f0" }}>📍 {job.location}</p>
            </div>
          )}

          {job.dateApplied && (
            <div>
              <p style={{ fontSize: 11, color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>Date Applied</p>
              <p style={{ fontSize: 14, color: "#e2e8f0" }}>📅 {job.dateApplied}</p>
            </div>
          )}

          {job.notes && (
            <div>
              <p style={{ fontSize: 11, color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>Notes</p>
              <p style={{
                fontSize: 14, color: "#94a3b8", lineHeight: 1.6,
                background: "#0f172a", padding: "10px 14px",
                borderRadius: 8, borderLeft: "3px solid #3b82f6",
              }}>
                {job.notes}
              </p>
            </div>
          )}

          {job.jobLink && (
            <div>
              <p style={{ fontSize: 11, color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>Job Posting</p>
              <a href={job.jobLink} target="_blank" rel="noreferrer"
                style={{ fontSize: 14, color: "#3b82f6", textDecoration: "none" }}>
                🔗 View Job Posting
              </a>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default JobDetails;
