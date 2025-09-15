import { PrismaClient, Vote } from "@prisma/client";
import { io } from "../app-websocket";
import { getPolls } from "../polls/module";
const prisma = new PrismaClient();

export async function createVote(payload: Vote) {
  try {
    const result = await prisma.vote.create({
      data: payload,
    });
    io.sockets.emit("poll:update", await getPolls({}));
    return result;
  } catch (err) {
    throw new Error("Failed to create vote");
  }
}
