import axios, { type AxiosRequestConfig } from "axios";
import type { Room } from "../components/RoomCard";

const api = axios.create({
  baseURL: "http://localhost:5000", // Vite proxy will forward /api
  timeout: 8000,
}); // same-origin; Vite proxy will forward /api

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

function serverErrorMessage(data: unknown): string | undefined {
  if (!isRecord(data)) return undefined;
  const val = data["error"];
  return typeof val === "string" ? val : undefined;
}

const MAX_RETRIES = 1;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!axios.isAxiosError(error))
      return Promise.reject(new Error("Request failed"));

    const cfg = (error.config || {}) as AxiosRequestConfig & {
      __retryCount?: number;
    };
    const status = error.response?.status;
    const isNetwork = !error.response; // network/timeout
    const retriableStatus =
      status !== undefined && [502, 503, 504].includes(status);
    const retriableCode = error.code === "ECONNABORTED"; // timeout
    const shouldRetry = isNetwork || retriableStatus || retriableCode;

    if (shouldRetry) {
      const retryCount = cfg.__retryCount ?? 0;
      if (retryCount < MAX_RETRIES) {
        cfg.__retryCount = retryCount + 1;
        // tiny backoff
        await new Promise((r) => setTimeout(r, 300));
        return api.request(cfg);
      }
    }

    const msg =
      serverErrorMessage(error.response?.data) ||
      error.message ||
      "Request failed";
    return Promise.reject(new Error(msg));
  }
);

function extractError(e: unknown, fallback: string) {
  if (axios.isAxiosError(e)) {
    const msg = serverErrorMessage(e.response?.data) || e.message || fallback;
    return new Error(typeof msg === "string" ? msg : fallback);
  }
  if (e instanceof Error) return e;
  return new Error(fallback);
}

export async function getStatus(): Promise<Room[]> {
  try {
    const { data } = await api.get("/api/status");
    return data.data as Room[];
  } catch (e) {
    throw extractError(e, "Failed to fetch status");
  }
}

export async function book(
  requested: number
): Promise<{ allocated: Room[]; travelTime: number }> {
  try {
    const { data } = await api.post("/api/book", { requested });
    return data.data as { allocated: Room[]; travelTime: number };
  } catch (e) {
    throw extractError(e, "Failed to book");
  }
}

export async function randomize(percent?: number): Promise<void> {
  try {
    await api.post("/api/randomize", percent != null ? { percent } : {});
  } catch (e) {
    throw extractError(e, "Failed to randomize");
  }
}

export async function reset(): Promise<void> {
  try {
    await api.post("/api/reset");
  } catch (e) {
    throw extractError(e, "Failed to reset");
  }
}
