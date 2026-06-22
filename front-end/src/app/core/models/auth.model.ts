export interface AuthRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: 'CUSTOMER' | 'ADMIN';
}

export interface AuthResponse {
  token: string;
  email: string;
  role: string;
}