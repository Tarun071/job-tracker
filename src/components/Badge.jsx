// ─────────────────────────────────────────────
//  components/Badge.jsx
//  Shows a colored status pill (Applied, etc.)
//  Props:
//    status (string) — one of the STATUS_OPTIONS
// ─────────────────────────────────────────────

import { STATUS_META } from "../data/jobs";

export default function Badge({ status }) {
  // Look up the colors for this status
  const meta = STATUS_META[status];

  // If status is unknown, show a plain grey badge
  if (!meta) {
    return (
      <span style={{
        background: "#f3f4f6",
        color: "#374151",
        fontSize: 11,
        fontWeight: 600,
        padding: "3px 10px",
        borderRadius: 20,
        letterSpacing: "0.02em",
      }}>
        {status}
      </span>
    );
  }

  return (
    <span style={{
      background: meta.bg,
      color: meta.color,
      fontSize: 11,
      fontWeight: 600,
      padding: "3px 10px",
      borderRadius: 20,
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      letterSpacing: "0.02em",
    }}>
      {/* Colored dot */}
      <span style={{
        width: 6,
        height: 6,
        borderRadius: "50%",
        background: meta.dot,
        flexShrink: 0,
      }} />
      {meta.label}
    </span>
  );
}
