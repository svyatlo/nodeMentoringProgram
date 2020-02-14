[Return to the main README.md](../../README.md)

# Task 4

## Prerequisites

The task is a continuation of Homework3 and should be done in the same repo.

## How to run

- To run task implementation please switch to the `task4` branch.
- Write `npm install`.
- Open folder `api`.
- Run the task `npm start`.
- Open Postman and try to send requeststo routes: `/users`, `/groups` or `/add-users-to-group`.

To POST into groups (`/groups`) or user-groups (`/add-users-to-group`) tables use the following expressions (x-www-form-urlencoded):

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

### Task 4.1

- Add **Group** entity to already existing **REST** service with **CRUD** operations.
  - The **Group** entity should have the following properties (you can use UUID as Group id):

  ``` javascript
  type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

  type Group = {
    id: string,
    name: string,
    permissions: Array<Permission>
  };
  ```
- The service should provide the following CRUDoperations for Group:
  - get group by id;
  - get all groups;
  - create and update a group;
  - remove group (hard delete–group data is fully removed from the DB).

- Storing of groups data should be done in PostgreSQLinGroups table.
- The service should follow the principles of 3-layer architecture.

### Task 4.2

Link User records in one table with Group records in another table.

- Add a UserGroup table(“many-to-many” relationship) which will store the data describingwhich users are assigned to which group.
- If any record gets removed from the DB, then all linked records should be removed from UserGroupas well.

### Task 4.3

Add `addUsersToGroup(groupId, userIds)` method which will allow adding users to a certain group.Use transactionsto save records in DB.

## Evaluation criteria

- Group entity is added, operations are implemented but there are some code structure/quality issues.
- Task 4.1 is fulfilled to the full extent.
- Task 4.2 is fulfilled to the full extent.
- Task 4.3is fulfilled to the full extent; transactions are used for saving records.