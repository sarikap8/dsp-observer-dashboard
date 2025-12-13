export type Role = "observer" | "dsp";

export type DspOption = {
  value: string;
  label: string;
};

export type UserDirectoryEntry = {
  role: Role;
  name: string;
  dspIds?: string[]; // DSPs this observer can evaluate
  dspId?: string; // DSP's own ID
  observerEmail?: string;
};

export const DSP_DIRECTORY: Record<string, DspOption & { email?: string; observerEmail?: string }> = {
  "john-steven": {
    value: "john-steven",
    label: "John Steven",
    email: "j1212steven@gmail.com",
    observerEmail: "arjun.mathu2005@gmail.com",
  },
  "eduardo-lopez": {
    value: "eduardo-lopez",
    label: "Eduardo Lopez",
    email: "eduardo_lopez@berkeley.edu",
    observerEmail: "arjun.mathu2005@gmail.com",
  },
};

export const USER_DIRECTORY: Record<string, UserDirectoryEntry> = {
  "arjun.mathu2005@gmail.com": {
    role: "observer",
    name: "Arjun Mathu",
    dspIds: ["john-steven", "eduardo-lopez"],
  },
  "j1212steven@gmail.com": {
    role: "dsp",
    name: "John Steven",
    dspId: "john-steven",
    observerEmail: "arjun.mathu2005@gmail.com",
  },
  // Add multiple email variations to catch your actual Google email
  "eduardo_lopez@berkeley.edu": {
    role: "dsp",
    name: "Eduardo Lopez",
    dspId: "eduardo-lopez",
    observerEmail: "arjun.mathu2005@gmail.com",
  },
  "eduardo_lopez@berkeley.com": {
    role: "dsp",
    name: "Eduardo Lopez",
    dspId: "eduardo-lopez",
    observerEmail: "arjun.mathu2005@gmail.com",
  },
  "elopez@berkeley.edu": {
    role: "dsp",
    name: "Eduardo Lopez",
    dspId: "eduardo-lopez",
    observerEmail: "arjun.mathu2005@gmail.com",
  },
  "gokuflys@gmail.com": {
    role: "observer",
    name: "Edward",
    dspIds: ["john-steven", "eduardo-lopez"],
  }
};

export type ActiveUser = {
  email: string;
  name: string;
  role: Role;
};

export const ACTIVE_USER_KEY = "activeUser";

export const findUserByEmail = (email?: string | null) => {
  if (!email) return null;
  return USER_DIRECTORY[email.toLowerCase()] ?? null;
};

export const getDspOptionsForObserver = (email?: string | null): DspOption[] => {
  const user = findUserByEmail(email);
  if (!user || user.role !== "observer" || !user.dspIds) return [];
  return user.dspIds
    .map((id) => DSP_DIRECTORY[id])
    .filter(Boolean);
};

export const getActiveUser = (): ActiveUser | null => {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(ACTIVE_USER_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as ActiveUser;
    if (parsed?.email && parsed?.role) return parsed;
  } catch {
    return null;
  }
  return null;
};

export const setActiveUser = (user: ActiveUser) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(user));
};
