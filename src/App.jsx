// src/App.jsx
import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";

import api from "./services/api";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    getJobs();
  }, []);

  async function getJobs() {
    try {
      const response = await api.get("/jobs");
      setJobs(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleAddJob(newJob) {
    setJobs((prev) => [newJob, ...prev]);
  }

  async function handleEditJob(id, updatedJob) {
    try {
      await api.put(`/jobs/${id}`, updatedJob);
      setJobs((prev) =>
        prev.map((job) => (job.id === id ? { ...job, ...updatedJob } : job))
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteJob(id) {
    const confirmed = window.confirm("Delete this application?");
    if (confirmed) {
      try {
        await api.delete(`/jobs/${id}`);
        setJobs((prev) => prev.filter((job) => job.id !== id));
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <AppRoutes
          jobs={jobs}
          onAdd={handleAddJob}
          onEdit={handleEditJob}
          onDelete={handleDeleteJob}
        />
      </main>
    </BrowserRouter>
  );
}

export default App;
