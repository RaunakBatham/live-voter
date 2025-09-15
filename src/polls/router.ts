import { Router } from "express";
import { createPolls, getPolls, getPollById, updatePoll } from "./module";
import { authorizeUser } from "../utils/auth";
const router = Router();

router.post("/", authorizeUser, async (req, res, next) => {
  // Create Poll
  const poll = await createPolls(req.body);
  res.status(201).json(poll);
});
router.post("/:id", authorizeUser, async (req, res, next) => {
  // Update Poll
  const { question, isPublished } = req.body;
  const poll = await updatePoll(Number(req.params.id), {
    question,
    isPublished,
  });
  res.status(200).json(poll);
});
router.get("/", async (req, res, next) => {
  // Get Polls
  const polls = await getPolls(req.query);
  res.status(200).json(polls);
});
router.get("/:id", async (req, res, next) => {
  // Get Poll By Id
  const poll = await getPollById(Number(req.params.id));
  res.status(200).json(poll);
});

export default router;
