import { findUserWithFilters } from "../users/module";
import bcrypt from "bcryptjs";
import { encodeJWT } from "../utils/auth";

export async function login(email: string, password: string) {
  const user = await findUserWithFilters({ email });
  if (!user) {
    throw new Error("User not found");
  } else if (!(await bcrypt.compare(password, user.passwordHash))) {
    throw new Error("Invalid password");
  } else {
    const token = await encodeJWT({ id: user.id });
    return token;
  }
}
