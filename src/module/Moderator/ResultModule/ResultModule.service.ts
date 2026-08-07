import { prisma } from "../../../lib/prisma";

const postNewResultIntoDB = async (userID: string, payload: any) => {
  const result = await prisma.result.create({
    data: {
      ...payload,
      userID,
    },
  });
  return result;
};

const getAllResultsFromDB = async () => {
  const result = await prisma.result.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
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
  postNewResultIntoDB,
  getAllResultsFromDB,
  updateResultIntoDB,
  deleteResultIntoDB,
};