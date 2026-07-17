import { Role } from "../../../generated/prisma/enums";

export interface AdminPayload {
  name : string;
  email? : string;
  institute : string;
  class: string;
  phoneNumber : string;
  profilePicture? : string;
  role?: Role;
  
}