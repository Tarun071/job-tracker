// src/services/api.js

const BASE_URL = import.meta.env.VITE_API_URL || "https://job-manager-backend-tg0v.onrender.com";

// ── Jobs ──

export async function fetchJobs() {
  const res = await fetch(`${BASE_URL}/jobs`);
  if (!res.ok) throw new Error("Failed to fetch jobs");
  return res.json();
}

export async function addJob(job) {
  const res = await fetch(`${BASE_URL}/jobs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(job),
  });
  if (!res.ok) throw new Error("Failed to add job");
  return res.json();
}

export async function updateJob(id, job) {
  const res = await fetch(`${BASE_URL}/jobs/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(job),
  });
  if (!res.ok) throw new Error("Failed to update job");
  return res.json();
}

export async function deleteJob(id) {
  const res = await fetch(`${BASE_URL}/jobs/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete job");
}

// ── Auth ──

export async function registerUser(userData) {
  // Check if email already exists
  const res = await fetch(`${BASE_URL}/users?email=${userData.email}`);
  const existing = await res.json();
  if (existing.length > 0) throw new Error("Email already registered");

  const createRes = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!createRes.ok) throw new Error("Failed to register");
  return createRes.json();
}

export async function loginUser(email, password) {
  const res = await fetch(`${BASE_URL}/users?email=${email}&password=${password}`);
  const users = await res.json();
  if (users.length === 0) throw new Error("Invalid email or password");
  return users[0];
}