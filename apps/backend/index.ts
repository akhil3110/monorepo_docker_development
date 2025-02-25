import express from "express";
import { prismaClient } from "db/client";

const app = express();

app.use(express.json());

app.get("/users", (req, res) => {
  try {
    const allUsers = prismaClient.user.findMany()
    res.json(allUsers);    
  } catch (error) {
    console.log("error in /", error)
  }
})

app.post("/user", (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    res.status(400).json({ error: "Username and password are required" });
    return
  }

  const user = prismaClient.user.create({
    data: {
      username,
      password
    }
  })
  
  res.status(201).json(user);
})

app.listen(8080);