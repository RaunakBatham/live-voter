import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();

export async function createUser(payload: Omit<User, "id">) {
  try {
    return prisma.user.create({
      data: payload,
    });
  } catch (error) {
    throw new Error("Failed to create user");
  }
}

export async function getUsers(payload: Object) {
  try {
    return prisma.user.findMany({ where: payload });
  } catch (error) {
    throw new Error("Failed to get users");
  }
}

export async function findUserWithFilters(payload: Object) {
  try {
    return prisma.user.findFirst({ where: payload });
  } catch (error) {
    throw new Error("Failed to find user");
  }
}
