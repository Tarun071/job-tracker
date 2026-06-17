// src/pages/AddJobPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { STATUS_OPTIONS } from "../data/jobs";
import api from "../services/api";

const EMPTY_FORM = {
  company: "", role: "", location: "",
  status: "Applied", dateApplied: "", jobLink: "", notes: "",
};

function AddJobPage({ onAdd }) {
  const navigate  = useNavigate();
  const [form,    setForm]    = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  const isValid = form.company.trim() !== "" && form.role.trim() !== "";

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!isValid) return;

    setLoading(true);
    setError("");

    try {
      const response = await api.post("/jobs", form);
      onAdd(response.data);
      setForm(EMPTY_FORM);
      navigate("/");
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
    <div className="add-job-page">
      <h1 className="add-job-page__title">Add New Application</h1>
      <p className="add-job-page__subtitle">Fields marked * are required.</p>

      <div className="add-job-page__card">
        <form onSubmit={handleSubmit} className="add-job-page__fields">

          <div>
            <label style={labelStyle}>Company *</label>
            <input style={inputStyle} name="company" value={form.company}
              onChange={handleChange} placeholder="e.g. Google" />
          </div>

          <div>
            <label style={labelStyle}>Role *</label>
            <input style={inputStyle} name="role" value={form.role}
              onChange={handleChange} placeholder="e.g. Software Developer" />
          </div>

          <div>
            <label style={labelStyle}>Location</label>
            <input style={inputStyle} name="location" value={form.location}
              onChange={handleChange} placeholder="e.g. Hyderabad" />
          </div>

          <div>
            <label style={labelStyle}>Status</label>
            <select style={{ ...inputStyle, cursor: "pointer" }} name="status"
              value={form.status} onChange={handleChange}>
              {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label style={labelStyle}>Date Applied</label>
            <input type="date" style={inputStyle} name="dateApplied"
              value={form.dateApplied} onChange={handleChange} />
          </div>

          <div>
            <label style={labelStyle}>Job Posting Link</label>
            <input style={inputStyle} name="jobLink" value={form.jobLink}
              onChange={handleChange} placeholder="e.g. LinkedIn, Naukri..." />
          </div>

          <div>
            <label style={labelStyle}>Notes</label>
            <textarea style={{ ...inputStyle, resize: "vertical", minHeight: 80, lineHeight: 1.6 }}
              name="notes" value={form.notes} onChange={handleChange}
              placeholder="Referral? Round 1 done? Salary info..." />
          </div>

          {error && <div className="add-job-page__error">{error}</div>}

          <div className="add-job-page__actions">
            <button type="button" className="add-job-page__btn add-job-page__btn--cancel"
              onClick={() => navigate("/")}>
              ← Cancel
            </button>
            <button type="submit" className="add-job-page__btn add-job-page__btn--submit"
              disabled={!isValid || loading}>
              {loading ? "Saving..." : "Add Job"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default AddJobPage;
