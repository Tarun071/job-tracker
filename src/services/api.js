// ─────────────────────────────────────────────
//  services/api.js
//
//  Axios instance — same pattern as your
//  travel project's api.js
//  baseURL points to json-server on port 3000
// ─────────────────────────────────────────────

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export default api;
