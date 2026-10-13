import type { User } from "@/entities/user";

export interface AuthTokens {
  accessToken: string;
}

export interface AuthResponse extends AuthTokens {
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  acceptTerms: boolean;
  acceptDataProcessing: boolean;
  legalVersion: "2026-10-13";
  name?: string;
}
