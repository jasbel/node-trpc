import express from "express";
import * as trpc from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";

const app = express();

const appRouter = trpc.router().query("hello", {
  resolve() {
    return "hello world";
  },
});

export type AppRouter = typeof appRouter;

app.use(cors());

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: () => null,
  })
);

app.listen(3000);
console.log("server on port 3000");
