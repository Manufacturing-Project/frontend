import { execFile } from "node:child_process";

export interface UserRegistrationRequest {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
  }
  
  export interface UserResponse {
    token: string;
    id: string;
    email: string;
    username: string;
    createdAt: string;
  }



