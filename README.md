"# Express.js-crash-course"

### Express.js

Fast, unopinionated, minimalist web framework for Node.js

Express.js is a minimal and flexible web framework for Node.js used to build web applications and RESTful APIs.

- `Express.js@5` requires node version greater than 18

### Request and Response

The req object represents the incoming HTTP request.
It contains all the information sent by the client (browser, Postman, etc.)

- Common properties of request(req) are `req.params, req.query, req.body, req.headers, req.method, req.url`

The res object is used to send data back to the client.

- Common methods of response(res) are `res.send(), res.json(), res.status(), res.redirect(), res.set()`

### Routing in express.js

Routing in Express means defining how your application responds to client requests (like GET, POST, etc.) to different URL paths.

### Route Parameters

```js
app.get("/health/:id", (req, res) => {
  res
    .status(200)
    .json({ message: `I am healthy system id : ${req.params.id}` });
});
```

- Visiting `health/2` it will return `{"message":"I am healthy system id : 3"}`

### Query Parameters

```js
app.get("/name", (req, res) => {
  console.log("query", req.query.lastname);
  res.json({ message: "API for Query" });
});
```

```
http://localhost:4000/name?lastname=verma
```

- Accessing `http://localhost:4000/name?lastname=verma` will return the data in object
