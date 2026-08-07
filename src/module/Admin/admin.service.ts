
import { IsApproved, Role } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

// সব ইউজার নিয়ে আসার জন্য
const getAllUserIntoDB = async () => {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      phoneNumber: true,
      profilePicture: true,
      role: true,
      status: true,
      isApproved: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return result;
};

// মডারেটর রিকোয়েস্ট বা পেন্ডিং ইউজারদের আনার জন্য
const getModeratorRequestsIntoDB = async () => {
  const result = await prisma.user.findMany({
    where: {
      OR: [
        { isApproved: IsApproved.PENDING },
        { role: Role.MODERATOR }
      ]
    },
    select: {
      id: true,
      name: true,
      email: true,
      phoneNumber: true,
      profilePicture: true,
      class: true,
      institute: true,
      role: true,
      status: true,
      isApproved: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return result;
};

// ইউজারকে স্টুডেন্ট হিসেবে এপ্রুভ করা
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

// ইউজার স্ট্যাটাস আপডেট করার জন্য (Approve/Reject/etc.)
const updateRequestStatusIntoDB = async (id: string, status: string) => {
  const isUserExist = await prisma.user.findUnique({
    where: { id },
  });

  if (!isUserExist) {
    throw new Error("User not found!");
  }

  const result = await prisma.user.update({
    where: { id },
    data: {
      ...(status === "APPROVED" ? { isApproved: IsApproved.APPROVED, role: Role.MODERATOR } : {}),
      ...(status === "BANNED" ? { status: "BANNED" } : {}),
    },
  });
  
  return result;
};

// ইউজারকে ব্যান করা
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

// ইউজারকে মডারেটর করা
const makeModeratorIntoDB = async (id: string) => {
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
};

export const adminService = {
  getAllUserIntoDB,
  getModeratorRequestsIntoDB,
  approveUserToStudentIntoDB,
  updateRequestStatusIntoDB,
  banUserIntoDB,
  makeModeratorIntoDB,
};