import { Role } from "../../../generated/prisma/enums";

export interface RegisterUserPayload {
  name : string;
  email? : string;
  institute : string;
  class: string;
  phoneNumber : string;
  password: string;
  profilePicture? : string;
  role?: Role;
  
}


// auth.interface.ts ফাইলে এটি আপডেট করে নিন
export interface ILoginUser {
  phoneNumber: string; // আগে এখানে email ছিল
  password: string;
}