// ─────────────────────────────────────────────
//  components/StatsBar.jsx
//  Shows 4 count cards at the top of the app
//  Props:
//    jobs (array) — full list of job objects
// ─────────────────────────────────────────────

import { STATUS_OPTIONS, STATUS_META } from "../data/jobs";

export default function StatsBar({ jobs }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 12,
      marginBottom: 28,
    }}>
      {STATUS_OPTIONS.map((status) => {
        // Count how many jobs have this status
        const count = jobs.filter((job) => job.status === status).length;
        const meta = STATUS_META[status];

        return (
          <div
            key={status}
            style={{
              background: meta.bg,
              borderRadius: 12,
              padding: "14px 16px",
              textAlign: "center",
            }}
          >
            {/* Big number */}
            <div style={{
              fontSize: 26,
              fontWeight: 700,
              color: meta.color,
              lineHeight: 1,
            }}>
              {count}
            </div>

            {/* Status label */}
            <div style={{
              fontSize: 12,
              color: meta.color,
              marginTop: 5,
              opacity: 0.85,
              fontWeight: 500,
            }}>
              {status}
            </div>
          </div>
        );
      })}
    </div>
  );
}
