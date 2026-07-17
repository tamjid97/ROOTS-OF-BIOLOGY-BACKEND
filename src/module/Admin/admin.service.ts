import { IsApproved, Role } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma"



const getAllUserIntoDB = async () => {
const result = await prisma.user.findMany({
  select :{
    name : true,
    email : true,
    institute : true,
    class: true,
    phoneNumber : true,
    profilePicture : true,
    role: true,
  },
  orderBy : {
    createdAt : "desc"
  }
});
return result;
}


const approveUserToStudentIntoDB = async (id: string) => {
  
  const isUserExist = await prisma.user.findUnique({
    where: { id },
  });

  if (!isUserExist) {
    throw new Error("User not found!");
  }


  if (isUserExist.role === Role.STUDENT) {
    throw new Error("User is already a student!");
  }


  const result = await prisma.user.update({
    where: { id },
    data: {
      role: Role.STUDENT,        
      isApproved: IsApproved.APPROVED 
    },
  });
  
  return result;
};



// নিচে আমি সরাসরি string ধরে করে দিয়েছি।

const banUserIntoDB = async (id: string) => {
  
  const isUserExist = await prisma.user.findUnique({
    where: { id },
  });

  if (!isUserExist) {
    throw new Error("User not found!");
  }


  if (isUserExist.status === "BANNED") { 
    throw new Error("User is already BANNED!");
  }


  const result = await prisma.user.update({
    where: { id },
    data: {
      status: "BANNED" 
    },
  });
  

  return result; 
};

const makeModeratorIntoDB = async (id  : string) => {
const isUserExist = await prisma.user.findUnique({
    where: { id },
  });

  if (!isUserExist) {
    throw new Error("User not found!");
  }

  if (isUserExist.role === Role.MODERATOR) {
    throw new Error("User is already a MODERATOR!");
  }

  if (isUserExist.role === Role.ADMIN) {
    throw new Error("An ADMIN cannot be demoted to a MODERATOR via this API!");
  }

  const result = await prisma.user.update({
    where: { id },
    data: {
      role: Role.MODERATOR,          
      
    },
  });
  
  return result;
}
  

export const adminService = {
getAllUserIntoDB,
approveUserToStudentIntoDB,
banUserIntoDB,
makeModeratorIntoDB
}
