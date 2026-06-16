// ─────────────────────────────────────────────
//  pages/AddJobPage.jsx
// ─────────────────────────────────────────────

import { useState } from "react";
import { STATUS_OPTIONS } from "../data/jobs";
import { addJob } from "../services/api";

const EMPTY_FORM = {
  company:     "",
  role:        "",
  location:    "",
  status:      "Applied",
  dateApplied: "",
  jobLink:     "",
  notes:       "",
};

export default function AddJobPage({ onAdd, onNavigate }) {
  const [form,    setForm]    = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  const isValid = form.company.trim() !== "" && form.role.trim() !== "";

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit() {
    if (!isValid) return;

    setLoading(true);
    setError("");

    try {
      // POST to Render backend — json-server assigns the id automatically
      const savedJob = await addJob(form);
      onAdd(savedJob);        // pass saved job (with real id) to App
      setForm(EMPTY_FORM);
      onNavigate("home");
    } catch (err) {
      setError("Failed to save job. Please try again.");
    }

    setLoading(false);
  }

  const inputStyle = {
    width: "100%", boxSizing: "border-box",
    fontSize: 14, padding: "10px 12px",
    border: "1px solid #d1d5db", borderRadius: 9,
    background: "#f9fafb", color: "#111827", outline: "none",
  };

  const labelStyle = {
    fontSize: 12, color: "#6b7280", fontWeight: 600,
    display: "block", marginBottom: 5,
    textTransform: "uppercase", letterSpacing: "0.04em",
  };

  return (
    <div style={{ maxWidth: 540, margin: "0 auto", padding: "32px 20px" }}>

      <h1 style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 700, color: "#111827" }}>
        Add New Application
      </h1>
      <p style={{ margin: "0 0 28px", fontSize: 13, color: "#6b7280" }}>
        Fill in the details below. Fields marked * are required.
      </p>

      <div style={{
        background: "#fff", border: "1px solid #e5e7eb",
        borderRadius: 16, padding: 28,
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Company */}
          <div>
            <label style={labelStyle}>Company *</label>
            <input
              style={inputStyle} value={form.company}
              onChange={(e) => handleChange("company", e.target.value)}
              placeholder="e.g. Google"
            />
          </div>

          {/* Role */}
          <div>
            <label style={labelStyle}>Role *</label>
            <input
              style={inputStyle} value={form.role}
              onChange={(e) => handleChange("role", e.target.value)}
              placeholder="e.g. Software Developer"
            />
          </div>

          {/* Location */}
          <div>
            <label style={labelStyle}>Location</label>
            <input
              style={inputStyle} value={form.location}
              onChange={(e) => handleChange("location", e.target.value)}
              placeholder="e.g. Hyderabad"
            />
          </div>

          {/* Status */}
          <div>
            <label style={labelStyle}>Status</label>
            <select
              style={{ ...inputStyle, cursor: "pointer" }}
              value={form.status}
              onChange={(e) => handleChange("status", e.target.value)}
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label style={labelStyle}>Date Applied</label>
            <input
              type="date" style={inputStyle}
              value={form.dateApplied}
              onChange={(e) => handleChange("dateApplied", e.target.value)}
            />
          </div>

          {/* Job Link */}
          <div>
            <label style={labelStyle}>Job Posting Link</label>
            <input
              style={inputStyle} value={form.jobLink}
              onChange={(e) => handleChange("jobLink", e.target.value)}
              placeholder="e.g. LinkedIn, Wellfound, Naukri..."
            />
          </div>

          {/* Notes */}
          <div>
            <label style={labelStyle}>Notes</label>
            <textarea
              style={{ ...inputStyle, resize: "vertical", minHeight: 80, lineHeight: 1.6 }}
              value={form.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              placeholder="Referral? Round 1 done? Salary info..."
            />
          </div>

          {/* Error */}
          {error && (
            <div style={{
              background: "#fef2f2", border: "1px solid #fecaca",
              borderRadius: 8, padding: "9px 13px",
              fontSize: 13, color: "#dc2626",
            }}>
              {error}
            </div>
          )}

          {/* Buttons */}
          <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
            <button
              onClick={() => onNavigate("home")}
              style={{
                flex: 1, padding: "11px 0", borderRadius: 9,
                cursor: "pointer", background: "transparent",
                border: "1px solid #d1d5db",
                color: "#6b7280", fontSize: 14, fontWeight: 500,
              }}
            >
              ← Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!isValid || loading}
              style={{
                flex: 2, padding: "11px 0", borderRadius: 9,
                cursor: isValid && !loading ? "pointer" : "not-allowed",
                background: isValid && !loading ? "#1d4ed8" : "#e5e7eb",
                border: "none",
                color: isValid && !loading ? "#fff" : "#9ca3af",
                fontSize: 14, fontWeight: 700,
              }}
            >
              {loading ? "Saving..." : "Add Job"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}