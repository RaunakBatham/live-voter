import { Router } from "express";
import { login } from "./module";
const router = Router();

router.post("/", async (req, res, next) => {
  const { email, password } = req.body;
  const token = await login(email, password);
  res.status(201).json({ token });
});

export default router;
