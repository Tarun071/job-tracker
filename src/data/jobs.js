// ─────────────────────────────────────────────
//  data/jobs.js
//  All job application data lives here as an
//  array of objects. Each object = one job.
// ─────────────────────────────────────────────

const jobsData = [
  {
    id: 1,
    company: "Google",
    role: "Software Developer",
    location: "Hyderabad",
    status: "Interview",
    dateApplied: "2026-05-10",
    jobLink: "https://careers.google.com",
    notes: "Referral from college senior. DSA round scheduled.",
  },
  {
    id: 2,
    company: "TCS",
    role: "Python Developer",
    location: "Bengaluru",
    status: "Applied",
    dateApplied: "2026-05-18",
    jobLink: "https://www.tcs.com/careers",
    notes: "Applied via TCS NextStep portal.",
  },
  {
    id: 3,
    company: "Infosys",
    role: "Full Stack Developer",
    location: "Hyderabad",
    status: "Applied",
    dateApplied: "2026-05-20",
    jobLink: "https://www.infosys.com/careers",
    notes: "Fresher batch. Waiting for response.",
  },
  {
    id: 4,
    company: "Wipro",
    role: "Data Analyst",
    location: "Remote",
    status: "Rejected",
    dateApplied: "2026-04-30",
    jobLink: "https://careers.wipro.com",
    notes: "No feedback received.",
  },
  {
    id: 5,
    company: "Zoho",
    role: "Software Developer",
    location: "Chennai",
    status: "Offer",
    dateApplied: "2026-04-15",
    jobLink: "https://www.zoho.com/careers",
    notes: "Offer letter received! Salary: 4.5 LPA.",
  },
  {
    id: 6,
    company: "Razorpay",
    role: "Backend Developer",
    location: "Bengaluru",
    status: "Interview",
    dateApplied: "2026-05-22",
    jobLink: "https://razorpay.com/jobs",
    notes: "Technical round 2 pending.",
  },
];

export default jobsData;

// ─────────────────────────────────────────────
//  STATUS_OPTIONS
//  All valid status values used across the app
// ─────────────────────────────────────────────
export const STATUS_OPTIONS = ["Applied", "Interview", "Offer", "Rejected"];

// ─────────────────────────────────────────────
//  STATUS_META
//  Colors and labels for each status badge
// ─────────────────────────────────────────────
export const STATUS_META = {
  Applied:   { bg: "#dbeafe", color: "#1d4ed8", dot: "#3b82f6", label: "Applied"   },
  Interview: { bg: "#fef3c7", color: "#92400e", dot: "#f59e0b", label: "Interview" },
  Offer:     { bg: "#dcfce7", color: "#166534", dot: "#22c55e", label: "Offer"     },
  Rejected:  { bg: "#fee2e2", color: "#991b1b", dot: "#ef4444", label: "Rejected"  },
};