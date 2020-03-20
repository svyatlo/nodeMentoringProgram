[Return to the main README.md](../../README.md)

# Task 5 LOGGING & ERROR HANDLING

## Prerequisites

The task is a continuation of Homework4 and should be done in the same repo.

## How to run

- To run task implementation please switch to the `task4` branch.
- Write `npm install`.
- Open folder `api`.
- Run the task `npm start`.
- Open Postman and try to send requests to routes: `/users` or `/groups`.

To POST into groups (route `/groups`) tables use the following expressions (x-www-form-urlencoded):

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

### Task 5.1

Add express middlewarewhich will log which service method has been invoked and which arguments have been passed to it.

### Task 5.2

- Add express middlewarewhich will log all unhandled errors and return a standard message with HTTP code `500` (Internal Server Error).
**Remark:** Do not modify the status code and the message for other errors like validation errors from the previous task.

- Add error handling to `process.on(‘uncaughtException’,...)`.
- Add Unhandled promise rejection listener to log errors.

### Task 5.3

Every method in the controllers should log the errors which should include the following information:
- method name;
- arguments which have been passed to the method;
- error message.

## Evaluation criteria

- Custom logger based on console.log is added instead of Loggerpackage.
- **Task 5.1** is fulfilled to the full extent; logs are written into the console.
- **Task 5.2** is fulfilled to the full extent; [Winston](https://github.com/winstonjs/winston) package is used for logging.
- **Task 5.3** is fulfilled to the full extent.
- *Add middleware wrapper functions (or decorators) which will track the methods’ execution time.*