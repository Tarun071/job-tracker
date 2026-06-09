// ─────────────────────────────────────────────
//  components/JobFormModal.jsx
//  A popup modal for Add / Edit job form
//  Props:
//    form      (object)   — current form field values
//    setForm   (function) — updates form state
//    onSave    (function) — called when form is submitted
//    onClose   (function) — called when modal is closed
//    isEditing (boolean)  — true = editing, false = adding
// ─────────────────────────────────────────────

import { STATUS_OPTIONS } from "../data/jobs";

export default function JobFormModal({ form, setForm, onSave, onClose, isEditing }) {
  // Form is valid only when company and role are filled
  const isValid = form.company.trim() !== "" && form.role.trim() !== "";

  // Helper: update one field in the form object
  // e.g. handleChange("company", "Google")
  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  // ── Shared input style ──
  const inputStyle = {
    width: "100%",
    boxSizing: "border-box",
    fontSize: 14,
    padding: "9px 11px",
    border: "1px solid #d1d5db",
    borderRadius: 8,
    background: "#f9fafb",
    color: "#111827",
    outline: "none",
  };

  const labelStyle = {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: 500,
    display: "block",
    marginBottom: 5,
  };

  return (
    // ── Dark overlay behind the modal ──
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.45)",
      zIndex: 100,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 16,
    }}>
      {/* ── Modal box ── */}
      <div style={{
        background: "#ffffff",
        borderRadius: 16,
        padding: 28,
        width: "100%",
        maxWidth: 440,
        boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
      }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
          <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "#111827" }}>
            {isEditing ? "Edit Application" : "Add Application"}
          </h2>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#9ca3af", lineHeight: 1 }}
          >
            ✕
          </button>
        </div>

        {/* Form fields */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

          {/* Company */}
          <div>
            <label style={labelStyle}>Company *</label>
            <input
              style={inputStyle}
              value={form.company}
              onChange={(e) => handleChange("company", e.target.value)}
              placeholder="e.g. Google"
            />
          </div>

          {/* Role */}
          <div>
            <label style={labelStyle}>Role *</label>
            <input
              style={inputStyle}
              value={form.role}
              onChange={(e) => handleChange("role", e.target.value)}
              placeholder="e.g. Software Developer"
            />
          </div>

          {/* Location */}
          <div>
            <label style={labelStyle}>Location</label>
            <input
              style={inputStyle}
              value={form.location}
              onChange={(e) => handleChange("location", e.target.value)}
              placeholder="e.g. Hyderabad"
            />
          </div>

          {/* Status dropdown */}
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

          {/* Date Applied */}
          <div>
            <label style={labelStyle}>Date Applied</label>
            <input
              type="date"
              style={inputStyle}
              value={form.dateApplied}
              onChange={(e) => handleChange("dateApplied", e.target.value)}
            />
          </div>

          {/* Job Link */}
          <div>
            <label style={labelStyle}>Job Link</label>
            <input
              style={inputStyle}
              value={form.jobLink}
              onChange={(e) => handleChange("jobLink", e.target.value)}
              placeholder="Linkedin, wellfound, naukri"
            />
          </div>

          {/* Notes */}
          <div>
            <label style={labelStyle}>Notes</label>
            <textarea
              style={{ ...inputStyle, resize: "vertical", minHeight: 70, lineHeight: 1.5 }}
              value={form.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              placeholder="Any notes about this application..."
            />
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
            <button
              onClick={onClose}
              style={{
                flex: 1, padding: "10px 0", borderRadius: 9, cursor: "pointer",
                background: "transparent", border: "1px solid #d1d5db",
                color: "#6b7280", fontSize: 14, fontWeight: 500,
              }}
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              disabled={!isValid}
              style={{
                flex: 1, padding: "10px 0", borderRadius: 9,
                cursor: isValid ? "pointer" : "not-allowed",
                background: isValid ? "#1d4ed8" : "#e5e7eb",
                border: "none",
                color: isValid ? "#fff" : "#9ca3af",
                fontSize: 14, fontWeight: 600,
              }}
            >
              {isEditing ? "Save Changes" : "Add Job"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
