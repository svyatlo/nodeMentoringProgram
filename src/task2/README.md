[Return to the main README.md](../../README.md)

# Task 2

## How to run

- To run task implementation please switch to the `task2` branch.
- Write `npm install`, then `npm run task2`.
- Then open Postman and try to send different requests, for example GET to `http://localhost:5000/persons`.

## Prerequisites

Install globally or locally npm package [nodemon](https://github.com/remy/nodemon), configure [babel](https://babeljs.io/) and [eslint](https://eslint.org/).
Use the following [eslintconfig file](https://epa.ms/nodejs19-hw2-ex1).

*As an alternative you can use TypeScript, this will be a big plus. Please inform your mentor if you decide to move on with TypeScript.*

### Task 2.1

Write a simple REST service with CRUD operations for User entity. 
To create REST service, use [ExpressJS](https://expressjs.com/). The User should have the following properties(you can use UUID as a user identifier (id)):

```javascript
type User = {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}
```
- Service should have the following CRUD operations for **User**:

    - get user by **id**;
    - create and update user;
    - get auto-suggest list from ```limit``` users, sorted by login property and filtered by ```loginSubstringin``` the login property: ```getAutoSuggestUsers(loginSubstring, limit)```
    - remove user (soft delete–user gets marked with ```isDeleted``` flag, but not removed from the collection).

- Store user’s collection in the service memory (while the service is running).

To test the service CRUD methods, you can use [Postman](https://www.getpostman.com/).

### Task 2.2

Add server-side validation for create/update operations of User entity:

- all fields are required;
- login validationis required;
- password must contain letters and numbers;
- user’s age must be between 4 and 130.

In case of any property does not meet the validation requirements or the field is absent, return 400 (Bad Request) and detailed error message.
For requests validation use special packages like joi:
- https://github.com/hapijs/joi
- https://www.npmjs.com/package/express-joi-validation).

## Evaluation criteria

- Task 2.1 is partially implemented (w/o getAutoSuggestUsers or other methods).
- Task 2.1 is fulfilled to the full extent.
- Task 2.1 eslint rules are applied.
- Task 2.2 is fulfilled to the full extent; validation package is used.
- *Consider to use Typescript.*