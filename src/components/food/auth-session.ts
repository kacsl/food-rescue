const STORAGE_KEY = "food-rescue-session";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type FoodSession = {
  name: string;
  email: string;
  password: string;
};

export type FieldErrors = {
  name?: string;
  email?: string;
  password?: string;
};

/** Prototype Google sign-in. Matches the existing demo neighbor, with no password. */
export const GOOGLE_PROTOTYPE_SESSION: FoodSession = {
  name: "Kari",
  email: "kari@example.com",
  password: "",
};

function isSession(value: unknown): value is FoodSession {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  return (
    typeof record.name === "string" &&
    typeof record.email === "string" &&
    typeof record.password === "string"
  );
}

export function readFoodSession(): FoodSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    return isSession(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function writeFoodSession(session: FoodSession) {
  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function clearFoodSession() {
  window.sessionStorage.removeItem(STORAGE_KEY);
}

export function nameFromEmail(email: string) {
  const local = email.split("@")[0]?.replace(/[._+-]+/g, " ").trim();
  if (!local) return "Neighbor";
  return local.replace(/\b\w/g, (char) => char.toUpperCase());
}

export function validateSignUp(input: FoodSession): FieldErrors {
  return {
    name: requiredName(input.name),
    ...validateLogin(input.email, input.password),
  };
}

export function validateLogin(email: string, password: string): FieldErrors {
  return {
    email: requiredEmail(email),
    password: requiredPassword(password),
  };
}

function requiredName(name: string) {
  return name.trim() ? undefined : "Enter your name.";
}

function requiredEmail(email: string) {
  const next = email.trim();
  if (!next) return "Enter your email.";
  if (!EMAIL_PATTERN.test(next)) return "Enter a valid email.";
  return undefined;
}

function requiredPassword(password: string) {
  if (!password) return "Enter a password.";
  if (password.length < 8) return "Use at least 8 characters.";
  return undefined;
}

export function hasErrors(errors: FieldErrors) {
  return Boolean(errors.name || errors.email || errors.password);
}
