import { prisma } from "../../../lib/prisma";



const postWeeklyResultIntoDB = async (moderatorId: string, payload: any) => {
  const result = await prisma.result.create({
    data: {
      userID: payload.studentId, 
      marks: Number(payload.marks), 
    },
  });
  return result;
};


const updateResultIntoDB = async (id: string, payload: any) => {
  
  const isResultExist = await prisma.result.findUnique({
    where: { id },
  });

  if (!isResultExist) {
    throw new Error("Result not found!");
  }

  
  const result = await prisma.result.update({
    where: { id },
    data: payload,
  });
  return result;
};


const deleteResultIntoDB = async (id: string) => {

  const isResultExist = await prisma.result.findUnique({
    where: { id },
  });

  if (!isResultExist) {
    throw new Error("Result not found!");
  }


  const result = await prisma.result.delete({
    where: { id },
  });
  return result;
};

export const resultService = {
  postWeeklyResultIntoDB,
  updateResultIntoDB,
  deleteResultIntoDB,
};