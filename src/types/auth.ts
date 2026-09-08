export type Role = "super-admin" | "marketing" | "cskh";

export type AccountStatus = "active" | "locked";

export interface Account {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  status: AccountStatus;
}
