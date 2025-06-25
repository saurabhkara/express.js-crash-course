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
