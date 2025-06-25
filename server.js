import express from "express";

const app = express();
const PORT = process.env.PORT || 4000;

//Middleware express.json
app.use(express.json());

app.get("/", (req, res) => {
  console.log("express.js");
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

//App is listing
app.listen(PORT, () => {
  console.log(`Server is listning on ${PORT}`);
});
