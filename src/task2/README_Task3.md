[Return to the main README.md](../../README.md)

# Task 3

## Prerequisites

The task is a continuation of Homework2 and should be done in the same repo.

## How to run

- To run task implementation please switch to the `task2` branch.
- Write `npm install`.

- Install DB [PostgreSQL](https://www.postgresql.org/).
    - Open 'PgAdmin' from start menu;
    - On the left-side menu find Databases and click the right mouse button on it. Create a new database **"nodeMP"**;
    - Mouse over "nodeMP", click the right mouse button and select "Query Tool...".
    - Copy text from `database.sql` to the Query Editor and press Execute/Refresh(F5) button;
The table `user` with predefined users will be created.
To check it refresh the page, follow **NodeMP > Schemas > Tables**. To check if it fullfilled click the right button on the table `user` and select **View/Edit Data > All Rows**

- Run the task `npm run task2`.
- Open Postman and try to send requests the same way as in the [Task2](./README_Task2.md).

### Task 3.1

- Install DB PostgreSQL on your machine or use a free web hosting services for PostgreSQL: [Heroku](https://www.heroku.com/postgresor) or [elephantsql](https://www.elephantsql.com/plans.html).
- Write SQL script which will create **Users** table in the DB and fill it in with predefined users’ collection.
- Configure your REST service to work with PostgreSQL.
    - Use the [sequelize](http://docs.sequelizejs.com/) packageas ORM to work with PostgreSQL. As an alternative to sequelize you can use more low-level query-builder [library](http://knexjs.org/).

### Task 3.2

The service should adhere to [3-layer architecture principles](https://softwareontheroad.com/ideal-nodejs-project-structure/) and contain the following set of directories:

    - routers / controllers;
    - services;
    - data-access;
    - models.

## Evaluation criteria

- PostgreSQL database is installed and Userstable with some seed data is added to it.
- Some User CRUD REST methods are implemented to store/retrieve data from database. Code quality is not good.
- Task 3.1 is fulfilled to the full extent. All User REST methodsget/save data to real database instead of memory.
- Task 3.2 is fulfilled to the full extent. All components are correctly named and splitted by folders mentioned in Task 3.2.
- *Consider to use Typescript.*