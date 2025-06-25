import express from "express";
import cors from "cors";
import env from "dotenv";

import { dbConnect } from "./src/config/db.js";

const app = express();
env.config();
const PORT = process.env.PORT || 4000;

//Global Middleware express.json
app.use(express.json());
app.use(cors());

//Custom middleware

const apiDetails = (req, res, next) => {
  console.log("Details", req.method, req.url, new Date().toLocaleDateString());
  next();
};

app.use(apiDetails);

// Middleware only for particular resourses

const particularMiddleWare = (req, res, next) => {
  console.log("Route of api", req.url);
  next();
};

app.get("/", particularMiddleWare, (req, res) => {
  console.log("express.js");
  console.log("MongoDb", process.env.MONGO_DB);
  //   res.send("Welcome to Express.js tutorial");
  res.status(200).json({ message: "Express.js is good " });
});

//Accessing params
app.get("/health/:id", (req, res) => {
  res
    .status(200)
    .json({ message: `I am healthy system id : ${req.params.id}` });
});

//Accessing Query
app.get("/name", (req, res) => {
  console.log("query", req.query.lastname);
  res.json({ message: "API for Query" });
});

//Accessing body

app.post("/api/user", (req, res) => {
  console.log("body", req.body);
  res.json({ message: "users data" });
});

//Error handling middleware

app.use((error, req, res, next) => {
  console.error("Error", error.stack);
  res.status(500).json({ message: "Something went wrong" });
});

//App is listing
app.listen(PORT, () => {
  console.log(`Server is listning on ${PORT}`);
  dbConnect()
    .then(() => {
      console.log("Database connection stablised");
    })
    .catch((err) => {
      console.log("error occurred while connection db", err);
    });
});
