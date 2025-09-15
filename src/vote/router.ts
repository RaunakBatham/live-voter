import { Router } from "express";
import { createVote } from "./module";
import { authorizeUser } from "../utils/auth";
const router = Router();

router.post("/", authorizeUser, async (req, res, next) => {
  // Create Vote
  res.send(await createVote(req.body));
});

export default router;
