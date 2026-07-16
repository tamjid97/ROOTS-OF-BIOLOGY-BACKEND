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



export interface ILoginUser {
  phoneNumber: string; 
  password: string;
}