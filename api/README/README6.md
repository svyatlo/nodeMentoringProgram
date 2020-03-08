[Return to the main README.md](../../README.md)

# Task 6 JWT AUTHORIZATION AND CORS

## Prerequisites

The task is a continuation of **Homework5** and should be done in the same repo.

## How to run

- To run task implementation please switch to the `task4` branch.
- Write `npm install`.
- Open folder `api`.
- Run the task `npm start`.
- Open Postman and try to send requeststo routes: `/users` or `/groups`.

To POST into groups (`/groups`) tables use the following expressions (x-www-form-urlencoded):

```javascript
name:'Node.js mentoring program'
permissions[]:READ
permissions[]:WRITE
permissions[]:DELETE
permissions[]:SHARE
permissions[]:UPLOAD_FILES

groupId:b1476321-7244-4650-9cf8-64abeb230366
userIds[]:55df56dc-47af-4e53-b9f1-1f65d013ca66
userIds[]:7654c440-8318-48ed-955e-7d7b193eaf09
userIds[]:3452c440-8318-48ed-955e-7d7b193eaf09
```

### Task 6.1

Add authorization to the already existing REST service.
- Add `login(username, password)` method which should return JWTtoken.
- Add a middleware which will proxy all the requests (except login) and check that HTTP Authorization header has the correct value of JWTtoken.
- In case of the HTTPAuthorizationheader is absent in the request, the middleware should stop further controller method execution and return HTTP `401` code (Unauthorized Error) and standard error message.
- In case of HTTP Authorization header has invalid JWT token in the request, the middleware should return HTTP code `403`(Forbidden Error) and standard error message.

### Task 6.2

Add [CORS](https://github.com/expressjs/cors) middleware to access service methods from WEB applications hosted on another domains.

## Evaluation criteria

- **Task 6.1** is implemented partially; login method is added and JWT token is generated.
- **Task 6.1** is implemented partially; JWT token checking method is implemented.
- **Task 6.1** is fulfilled to the full extent; authorization working using middleware.
- **Task 6.2** is fulfilled to the full extent.