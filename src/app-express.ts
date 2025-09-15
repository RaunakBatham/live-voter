// Express Application

import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import usersRouter from "./users/router";
import loginRouter from "./login/router";
import pollsRouter from "./polls/router";
import votesRouter from "./vote/router";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../public/swagger.json";
import { authenticateUser } from "./utils/auth";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authenticateUser); // Check if the user has valid auth token

app.use(express.static("public")); // Serving HTML for live polls

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // Serving HTTP API docs

app.use("/users", usersRouter);
app.use("/login", loginRouter);
app.use("/polls", pollsRouter);
app.use("/votes", votesRouter);

app.use(
  (
    err: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    res.status(400).send((err as any).message);
  }
);

export default app;
