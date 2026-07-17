/**
 * Single-user app: only this account may sign in.
 * Enforced server-side (middleware + OAuth callback) and in the DB
 * (owner_only_signup trigger blocks all other signups).
 */
export const OWNER_EMAIL = "robertpierson196@gmail.com";
