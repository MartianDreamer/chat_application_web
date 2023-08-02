export interface User {
  id: string;
  username: string;
  email: string;
  phoneNumber: string;
  online: boolean;
  lastSeen: string;
}

export interface UserEdit {
  username: string | undefined;
  password: string | undefined;
  email: string | undefined;
  phoneNumber: string | undefined;
}
