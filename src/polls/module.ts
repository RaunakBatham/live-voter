import { PrismaClient, Poll, PollOption } from "@prisma/client";
import { io } from "../app-websocket";
const prisma = new PrismaClient();

export async function createPolls(
  payload: Pick<Poll, "question" | "userId" | "isPublished"> & {
    options: PollOption[];
  }
) {
  try {
    const result = prisma.poll.create({
      data: {
        ...payload,
        options: {
          createMany: {
            data: payload.options,
          },
        },
      },
    });
    io.sockets.emit("poll:update", await getPolls({}));
    return result;
  } catch (error) {
    throw new Error("Failed to create poll");
  }
}

export async function getPolls(payload: Object) {
  try {
    return prisma.poll.findMany({
      where: payload,
      include: {
        options: {
          include: {
            _count: {
              select: { votes: true },
            },
          },
        },
      },
    });
  } catch (error) {
    throw new Error("Failed to get polls");
  }
}

export async function getPollById(id: number) {
  try {
    return prisma.poll.findUnique({
      where: { id },
      include: {
        options: {
          include: {
            _count: {
              select: { votes: true },
            },
          },
        },
      },
    });
  } catch (error) {
    throw new Error("Failed to get poll by id");
  }
}

export async function updatePoll(
  id: number,
  payload: Pick<Poll, "question" | "isPublished">
) {
  try {
    const result = prisma.poll.update({
      where: { id },
      data: payload,
    });
    io.sockets.emit("poll:update", await getPolls({}));
    return result;
  } catch (error) {
    throw new Error("Failed to update poll");
  }
}
