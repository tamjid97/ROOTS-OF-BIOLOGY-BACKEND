import { IsApproved, Role } from "../../../../generated/prisma/enums";
import { prisma } from "../../../lib/prisma";

// 🌟 ১. ইউজার যখন নিজে থেকে স্টুডেন্ট হওয়ার রিকোয়েস্ট পাঠাবে
const requestStudentAccessIntoDB = async (userId: string) => {
  const isUserExist = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!isUserExist) {
    throw new Error("User not found!");
  }

  if (isUserExist.role === Role.STUDENT) {
    throw new Error("You are already a student!");
  }

  return await prisma.user.update({
    where: { id: userId },
    data: {
      isApproved: IsApproved.PENDING,
    },
  });
};

const updateStudentRequestStatusIntoDB = async (id: string, status: "APPROVED" | "REJECTED") => {
  const isUserExist = await prisma.user.findUnique({
    where: { id },
  });

  if (!isUserExist) {
    throw new Error("User not found!");
  }

  if (status === "APPROVED") {
    if (isUserExist.role === Role.STUDENT) {
      throw new Error("User is already a student!");
    }

    try {
      const lastApprovedUser = await prisma.user.findFirst({
        where: {
          isApproved: IsApproved.APPROVED,
          studentId: {
            not: null,
          },
        },
        orderBy: {
          studentId: 'desc',
        },
      });

      let nextSerial = 0;

      if (lastApprovedUser && lastApprovedUser.studentId) {
        const parts = lastApprovedUser.studentId.split('-'); 
        const lastPart = parts[parts.length - 1];
        
        if (lastPart) {
          const lastNumber = parseInt(lastPart, 10);
          if (!isNaN(lastNumber)) {
            nextSerial = lastNumber;
          }
        }
      }

      const nextSerialNo = nextSerial + 1;
      const batchPrefix = 'BIO';
      const year = '26';
      const customStudentId = `${batchPrefix}-${year}-${String(nextSerialNo).padStart(3, '0')}`;

      return await prisma.user.update({
        where: { id },
        data: {
          role: Role.STUDENT,        
          isApproved: IsApproved.APPROVED,
          studentId: customStudentId 
        },
      });
      
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      console.error("🔥 Prisma Error during approval:", errorMessage);
      throw new Error("Database error while approving student. Please check Vercel Logs.");
    }

  } else if (status === "REJECTED") {
    return await prisma.user.update({
      where: { id },
      data: {
        isApproved: IsApproved.REJECTED,
      },
    });
  } else {
    throw new Error("Invalid status provided!");
  }
};

const getPendingStudentRequestsFromDB = async () => {
  const result = await prisma.user.findMany({
    where: {
      isApproved: {
        in: [IsApproved.PENDING, IsApproved.APPROVED, IsApproved.REJECTED],
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return result;
};

// নতুন: নির্দিষ্ট আইডি দিয়ে স্টুডেন্টের তথ্য খোঁজার ফাংশন
const getStudentDetailsByIdFromDB = async (id: string) => {
  const result = await prisma.user.findUnique({
    where: { id },
  });

  if (!result) {
    throw new Error("Student not found!");
  }

  return result;
};

export const moderatorService = {
  requestStudentAccessAction: requestStudentAccessIntoDB,
  updateStudentRequestStatusIntoDB,
  getPendingStudentRequestsFromDB,
  getStudentDetailsByIdFromDB,
};