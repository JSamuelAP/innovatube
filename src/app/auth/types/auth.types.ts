export type LoginRequest = {
  identifier: string;
  password: string;
};

export type User = {
  id: number;
  name: string;
  lastName: string;
  username: string;
  email: string;
  token: string;
};

export type SignupRequest = Omit<User, 'id' | 'token'> & { password: string };
