import express from "express";

const app = express();
const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  console.log("express.js");
  //   res.send("Welcome to Express.js tutorial");
  res.status(200).json({ message: "Express.js is good " });
});

app.get("/health/:id", (req, res) => {
  res
    .status(200)
    .json({ message: `I am healthy system id : ${req.params.id}` });
});

app.get("/name", (req, res) => {
  console.log("query", req.query.lastname);
  res.json({ message: "API for Query" });
});

app.listen(PORT, () => {
  console.log(`Server is listning on ${PORT}`);
});
