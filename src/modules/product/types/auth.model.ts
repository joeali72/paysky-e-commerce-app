export interface User {
  id: number;
  email: string;
  username: string;
  name: {
    firstname: string;
    lastname: string;
  };
}

export type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
};

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}
