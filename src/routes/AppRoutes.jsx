// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";

import Home         from "../pages/HomePage";
import LoginPage    from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import Logout       from "../pages/Logout";
import AddJobPage   from "../pages/AddJobPage";
import JobDetails   from "../pages/JobDetails";
import Favorites    from "../pages/Favorites";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes({ jobs, onAdd, onEdit, onDelete }) {
  return (
    <Routes>
      <Route path="/"        element={<Home jobs={jobs} onEdit={onEdit} onDelete={onDelete} />} />
      <Route path="/login"   element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/logout"  element={<Logout />} />
      <Route path="/favorites" element={<Favorites onEdit={onEdit} onDelete={onDelete} />} />
      <Route path="/jobs/:id" element={<JobDetails jobs={jobs} />} />

      <Route
        path="/add-job"
        element={
          <ProtectedRoute>
            <AddJobPage onAdd={onAdd} />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
