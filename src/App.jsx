// ─────────────────────────────────────────────
//  App.jsx  ← Root component
// ─────────────────────────────────────────────

import { useState } from "react";

// ── Data ──
import jobsData from "./data/jobs";

// ── Components ──
import Navbar        from "./components/Navbar";
import JobFormModal  from "./components/JobFormModal";

// ── Pages ──
import HomePage   from "./pages/HomePage";
import AddJobPage from "./pages/AddJobPage";
import AboutPage  from "./pages/AboutPage";

const EMPTY_FORM = {
  company:     "",
  role:        "",
  location:    "",
  status:      "Applied",
  dateApplied: "",
  jobLink:     "",
  notes:       "",
};

export default function App() {
  // ── State ──
  const [jobs, setJobs]        = useState(jobsData);
  const [currentPage, setPage] = useState("home");

  // Edit modal state
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editForm, setEditForm]           = useState(EMPTY_FORM);
  const [editId, setEditId]               = useState(null);

  // ── Handlers ──

  function handleAddJob(newJob) {
    setJobs((prev) => [newJob, ...prev]);
  }

  function handleEditOpen(job) {
    setEditForm({
      company:     job.company,
      role:        job.role,
      location:    job.location,
      status:      job.status,
      dateApplied: job.dateApplied,
      jobLink:     job.jobLink,
      notes:       job.notes,
    });
    setEditId(job.id);
    setEditModalOpen(true);
  }

  function handleEditSave() {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === editId ? { ...job, ...editForm } : job
      )
    );
    setEditModalOpen(false);
  }

  function handleDelete(id) {
    const confirmed = window.confirm("Delete this application?");
    if (confirmed) {
      setJobs((prev) => prev.filter((job) => job.id !== id));
    }
  }

  // ── Page renderer ──
  function renderPage() {
    if (currentPage === "home") {
      return (
        <HomePage
          jobs={jobs}
          onEdit={handleEditOpen}
          onDelete={handleDelete}
          onNavigate={setPage}
        />
      );
    }

    if (currentPage === "add") {
      return (
        <AddJobPage
          onAdd={handleAddJob}
          onNavigate={setPage}
        />
      );
    }

    if (currentPage === "about") {
      return <AboutPage />;
    }

    return (
      <HomePage
        jobs={jobs}
        onEdit={handleEditOpen}
        onDelete={handleDelete}
        onNavigate={setPage}
      />
    );
  }

  // ── Render ──
  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "'Segoe UI', sans-serif" }}>
      <Navbar currentPage={currentPage} onNavigate={setPage} />
      {renderPage()}

      {editModalOpen && (
        <JobFormModal
          form={editForm}
          setForm={setEditForm}
          onSave={handleEditSave}
          onClose={() => setEditModalOpen(false)}
          isEditing={true}
        />
      )}
    </div>
  );
}
