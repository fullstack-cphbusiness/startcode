import express from "express";
import dotenv from "dotenv";
import path from "path"
dotenv.config()
const app = express()

app.use(express.static(path.join(process.cwd(), "public")))

app.get("/demo", (req, res) => {
  res.send("Server is up");
})

export default app;

