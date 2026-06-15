// ─────────────────────────────────────────────
//  App.jsx  ← Root component
// ─────────────────────────────────────────────

import { useState, useEffect } from "react";   // ← added useEffect

// ── Data ──
import jobsData from "./data/jobs";

// ── Components ──
import Navbar       from "./components/Navbar";
import JobFormModal from "./components/JobFormModal";

// ── Pages ──
import LoginPage    from "./pages/LoginPage";
import Favorites    from "./pages/Favorites";
import RegisterPage from "./pages/RegisterPage";
import HomePage     from "./pages/HomePage";
import AddJobPage   from "./pages/AddJobPage";
import AboutPage    from "./pages/AboutPage";

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
  // ── Auth state ──
  const [currentUser, setCurrentUser] = useState(null);
  const [authPage,    setAuthPage]    = useState("login");

  // ── App state ── (loads from localStorage on first render)
  const [jobs, setJobs] = useState(() => {
    const saved = localStorage.getItem("jobs");
    return saved ? JSON.parse(saved) : jobsData;
  });

  const [currentPage, setPage] = useState("home");

  // ── Persist jobs to localStorage whenever they change ──
  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  // ── Edit modal state ──
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editForm, setEditForm]           = useState(EMPTY_FORM);
  const [editId,   setEditId]             = useState(null);

  // ── Auth handlers ──

  function handleLoginSuccess(user) {
    setCurrentUser(user);
    setPage("home");
  }

  function handleRegisterSuccess(user) {
    setCurrentUser(user);
    setPage("home");
  }

  function handleLogout() {
    setCurrentUser(null);
    setAuthPage("login");
    setPage("home");
  }

  // ── Job handlers ──

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

    if (currentPage === "favorites") {
      return <Favorites onEdit={handleEditOpen} onDelete={handleDelete} />;
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

  // ─────────────────────────────────────────
  //  Not logged in → show Login or Register
  // ─────────────────────────────────────────
  if (!currentUser) {
    if (authPage === "register") {
      return (
        <RegisterPage
          onRegisterSuccess={handleRegisterSuccess}
          onGoLogin={() => setAuthPage("login")}
        />
      );
    }
    return (
      <LoginPage
        onLoginSuccess={handleLoginSuccess}
        onGoRegister={() => setAuthPage("register")}
      />
    );
  }

  // ─────────────────────────────────────────
  //  Logged in → show full app
  // ─────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", fontFamily: "'Segoe UI', sans-serif" }}>
      <Navbar
        currentPage={currentPage}
        onNavigate={setPage}
        user={currentUser}
        onLogout={handleLogout}
      />
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
