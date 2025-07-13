export interface AuthenticatedUser {
  userId: string;
  role: "student" | "content_manager" | "admin" | "org_admin";
}