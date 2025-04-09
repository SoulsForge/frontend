import Profile from "../profile/profile";

export default interface User {
  id: number;
  username: string;
  email: string;
  emailVerified: boolean;
  role: string;
  profile: Profile;
  createdAt: Date;
  updatedAt: Date;
}
