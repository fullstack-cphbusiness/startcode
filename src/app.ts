import express from "express";
import dotenv from "dotenv";
import path from "path"
dotenv.config()
import { ApiError } from "./errors/errors"
import friendsRoutes from "./routes/friendRoutes";
const debug = require("debug")("app")
import { Request, Response } from "express"

const app = express()

//Please verify whether this works (requires app in your DEBUG variable, like DEBUG=www,app)
//If not replace with a console.log statement, or better the "advanced logger" refered to in the exercises
app.use((req, res, next) => {
  debug(new Date().toLocaleDateString(), req.method, req.originalUrl, req.ip)
  next()
})

app.use(express.static(path.join(process.cwd(), "public")))
app.use("/api/friends", friendsRoutes)

app.get("/demo", (req, res) => {
  res.send("Server is up");
})

//Our own default 404-handler for api-requests
app.use("/api", (req: any, res: any, next) => {
  res.status(404).json({ errorCode: 404, msg: "not found" })
})

//Makes JSON error-response for ApiErrors, otherwise pass on to default error handleer
app.use((err: any, req: Request, res: Response, next: Function) => {
  if (err instanceof (ApiError)) {
    res.status(err.errorCode).json({ errorCode: 404, msg: err.message })
  } else {
    next(err)
  }
})

export default app;

