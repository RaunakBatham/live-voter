import { Request, Router } from "express";
import { createUser, findUserWithFilters, getUsers } from "./module";
import bcrypt from "bcryptjs";
import { authorizeUser } from "../utils/auth";
const router = Router();

router.post("/", async (req, res, next) => {
  // Create User
  const { name, email, password } = req.body;
  const user = await createUser({
    name,
    email,
    passwordHash: await bcrypt.hash(password, 10),
  });
  res.status(201).json(user);
});
router.get("/", authorizeUser, async (req, res, next) => {
  // Get Users
  const users = await getUsers(req.query);
  res.status(200).json(users);
});
router.get("/:id", authorizeUser, async (req: any, res, next) => {
  // Get User By Id
  const user = await findUserWithFilters({ id: parseInt(req.params.id) });
  if (!user) {
    res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
});

export default router;
