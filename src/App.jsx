// ─────────────────────────────────────────────
//  App.jsx  ← Root component
// ─────────────────────────────────────────────

import { useState, useEffect } from "react";

// ── API ──
import { fetchJobs, deleteJob, updateJob } from "./services/api";

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

  // ── App state ──
  const [jobs,        setJobs]        = useState([]);
  const [currentPage, setPage]        = useState("home");
  const [loadingJobs, setLoadingJobs] = useState(false);

  // ── Edit modal state ──
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editForm,      setEditForm]      = useState(EMPTY_FORM);
  const [editId,        setEditId]        = useState(null);

  // ── Load jobs from backend when user logs in ──
  useEffect(() => {
    if (!currentUser) return;
    setLoadingJobs(true);
    fetchJobs()
      .then(setJobs)
      .catch(console.error)
      .finally(() => setLoadingJobs(false));
  }, [currentUser]);

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
    setJobs([]);
    setPage("home");
  }

  // ── Job handlers ──

  function handleAddJob(savedJob) {
    // savedJob comes from backend with real id
    setJobs((prev) => [savedJob, ...prev]);
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

  async function handleEditSave() {
    try {
      const updated = await updateJob(editId, editForm);
      setJobs((prev) =>
        prev.map((job) => job.id === editId ? updated : job)
      );
      setEditModalOpen(false);
    } catch (err) {
      alert("Failed to update job. Please try again.");
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm("Delete this application?");
    if (confirmed) {
      try {
        await deleteJob(id);
        setJobs((prev) => prev.filter((job) => job.id !== id));
      } catch (err) {
        alert("Failed to delete job. Please try again.");
      }
    }
  }

  // ── Page renderer ──
  function renderPage() {
    if (loadingJobs) {
      return (
        <div style={{ textAlign: "center", padding: "80px 20px", color: "#94a3b8", fontSize: 15 }}>
          Loading your jobs...
        </div>
      );
    }

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