export interface UserRegistrationRequest {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
  }
  
  export interface UserResponse {
    id: string;
    email: string;
    username: string;
    createdAt: string;
  }
  