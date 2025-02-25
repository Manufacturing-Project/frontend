export interface CreateUser {
    _id: any;              // For MongoDB, `_id` is typically an ObjectId type
    email: string;
    username: string;
    password: string;
  }
  