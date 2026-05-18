export type UserRole = "admin" | "member" | "student" | "client";

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

export async function getCurrentUser(): Promise<SessionUser | null> {
  return null;
}

export function canAccessAdmin(user: SessionUser | null) {
  return user?.role === "admin";
}
