export default interface User {
  id: number;
  username: string;
  email: string;
  emailVerified: boolean;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}
