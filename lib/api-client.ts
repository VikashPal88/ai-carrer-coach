// Centralized API client — all client-side API calls go through here.
// Each function uses fetch() with the proper HTTP method.

// ─── Helpers ────────────────────────────────────────────────

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed (${res.status})`);
  }
  return res.json();
}

function post<T>(url: string, body: unknown): Promise<T> {
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then((res) => handleResponse<T>(res));
}

function put<T>(url: string, body: unknown): Promise<T> {
  return fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then((res) => handleResponse<T>(res));
}

function get<T>(url: string): Promise<T> {
  return fetch(url, { method: "GET" }).then((res) => handleResponse<T>(res));
}

function del<T>(url: string): Promise<T> {
  return fetch(url, { method: "DELETE" }).then((res) => handleResponse<T>(res));
}

// ─── Resume APIs ────────────────────────────────────────────

export function getResume() {
  return get("/api/resume");
}

export function saveResume(content: string) {
  return post("/api/resume", { content });
}

export function improveWithAI(data: { current: string; type: string }) {
  return post<{ content: string }>("/api/resume/improve", data).then(
    (res) => res.content
  );
}

// ─── Interview / Quiz APIs ──────────────────────────────────

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export function generateQuiz() {
  return get<QuizQuestion[]>("/api/interview/quiz");
}

export function saveQuizResult(
  questions: QuizQuestion[],
  answers: string[],
  score: number
) {
  return post("/api/interview/quiz/result", { questions, answers, score });
}

export function getAssessments() {
  return get("/api/interview/assessments");
}

// ─── Dashboard APIs ─────────────────────────────────────────

export function getIndustryInsights() {
  return get("/api/dashboard/insights");
}

// ─── Cover Letter APIs ──────────────────────────────────────

export function getCoverLetters() {
  return get("/api/cover-letter");
}

export function generateCoverLetter(data: {
  companyName: string;
  jobTitle: string;
  jobDescription: string;
}) {
  return post("/api/cover-letter", data);
}

export function getCoverLetter(id: string) {
  return get(`/api/cover-letter/${id}`);
}

export function deleteCoverLetter(id: string) {
  return del(`/api/cover-letter/${id}`);
}

// ─── User APIs ──────────────────────────────────────────────

export function updateUser(data: {
  industry: string;
  experience: number;
  bio?: string;
  skills: string[];
}) {
  return put("/api/user", data);
}

export function getUserOnboardingStatus() {
  return get<{ isOnboarded: boolean }>("/api/user/onboarding-status");
}

// ─── Auth APIs ──────────────────────────────────────────────

export function registerUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  return post<{ success: boolean }>("/api/auth/register", data);
}
