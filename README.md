"# Express.js-crash-course"

### Express.js

Fast, unopinionated, minimalist web framework for Node.js

Express.js is a minimal and flexible web framework for Node.js used to build web applications and RESTful APIs.

- `Express.js@5` requires node version greater than 18

### HTTP Methods

These methods define the type of operation the client wants to perform on a resource (like a user, post, or product).

- `GET`: Read/fetch data
- `POST`: Create new data
- `PUT` : Update entire data
- `PATCH` :Update partial data
- `DELETE`: Delete data

### Status Code

These codes tell the client what happened with their request.

- `200`: OK => Request successful
- `201`: Created => Resource successfully created
- `204`: No Content => Success, but no data returned
- `300`: Multiple Choices => The resource has multiple options (rarely used)
- `301`: Moved Permanently => Resource has permanently moved to a new URL
- `400`: Bad Request => Malformed request
- `401`: Unauthorized => Not logged in or bad credentials
- `403`: Forbidden => Logged in but access denied
- `404`: Not Found => Resource not found
- `500`: Internal Server Error => General server failure
- `502`: Bad Gateway => Server got invalid response
- `503`: Service Unavailable => Server is overloaded or down

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

### Request Body

To access request body we need to use `express.json()` middleware in application

### Middleware in Routes

Middleware is a function that has access to `req` and `res`.
And it sits between the request and the response meaning it can:

- Inspect or modify the request
- Process or format the response

`Client → Middleware 1 → Middleware 2 → Route Handler → Response`

There are two type of middleware

- Global middleware
- Custom middleware

Global Inbuild Middleware example

```js
app.use(express.json());
```

Custom Globle middleware example

```js
const apiDetails = (req, res, next) => {
  console.log("Details", req.method, req.url, new Date().toLocaleDateString());
  next();
};

app.use(apiDetails);
```

Middleware can created for some particular resources(apis)

example

```js
const particularMiddleWare = (req, res, next) => {
  console.log("Route of api", req.url);
  next();
};

app.get("/", particularMiddleWare, (req, res) => {
  res.status(200).json({ message: "Express.js is good " });
});
```

As many as middlewares can be applied

### Error handling in Express js

```js
app.use((error, req, res, next) => {
  console.error("Error", error.stack);
  console.log(error.message, error.statusCode);
  const statusCode = error.statusCode ? error.statusCode : 500;
  res.status(statusCode).json({ message: error.message });
});
```

when inside `app.use()` callback 4 parameters are received, express.js consider that middleware as error handling middleware.

The best practice to handle error is to handle the error at the same place where error is occuring.

### Router

To refactor code express.js gives alot of options to achieve task.

```js
import express from "express";
const router = express.Router();
```

### MongoDB connection

Mongoose package is used to connect server and database.

- Establish connection with Database
- Create Schema
- Create Model
- Insert data into model

### Created three routes in project

- check `server.js`
