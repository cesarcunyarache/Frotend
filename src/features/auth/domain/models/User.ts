import { HtppStatus } from "./HttpStatus";

export interface User {
  id: string;
  name: string;
  email: string;
  status: boolean;
}

export interface AuthResponse {
  status: HtppStatus;
  data: User;
  message: string;
}