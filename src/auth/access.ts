import type { TUser } from "@/store/storeTypes/user";

/** Extend this union and ROLE_HOME when adding roles. */
export type AppRole = "super_admin" | "org_admin";

export const ROLE_HOME: Record<AppRole, string> = {
  super_admin: "/super-admin",
  org_admin: "/dashboard",
};

export function resolveAppRole(user: TUser | null): AppRole | null {
  if (!user) return null;
  if (user.is_super_admin === true) return "super_admin";
  if (user.role === "org_admin") return "org_admin";
  return null;
}

export function homePathForUser(user: TUser | null): string | null {
  const r = resolveAppRole(user);
  if (!r) return null;
  return ROLE_HOME[r];
}
