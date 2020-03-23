import { requestMock, responseMock } from './commonMocks';
import { controllers } from '../../src/controllers/group';
import { DBRequest } from '../../src/data-access/group';
jest.mock('../../src/data-access/group');

describe('group controller', () => {
    let req = null;
    let res = null;

    beforeEach(() => {
        req = requestMock();
        res = responseMock();
    });

    describe('getAllGroups', () => {
        test('should return status 200 and send array of groups in accordance with the initial conditions', async () => {
            // arrange
            const groups = [
              { group_id: '1982c440-8318-48ed-955e-7d7b193eaf09', group_name: 'Node.js mentoring program', group_permissions: '{"READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"}', createdAt: '2020-01-24', updatedAt: '2020-01-24' },
              { group_id: '55df56dc-47af-4e53-b9f1-1f65d013ca66', group_name: 'Angular mentoring program', group_permissions: '{"READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"}', createdAt: '2020-01-24', updatedAt: '2020-01-24' },
              { group_id: '4569c440-8318-48ed-955e-7d7b193eaf09', group_name: 'React mentoring program', group_permissions: '{"READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"}', createdAt: '2020-01-24', updatedAt: '2020-01-24' }
            ]
            DBRequest.findAllGroups.mockReturnValue(Promise.resolve(groups));
            
            // act
            await controllers.getAllGroups(req, res);
    
            // assert
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(groups);
        });
        
        test.each([
            [Promise.resolve([]), 404],
            [Promise.resolve(undefined), 404],
            [Promise.reject(), 500]
        ])('should send error status if %o (%p) (database doesn\'t exist or empty or error occured)', async (promiseState, sendStatus) => {
            // arrange
            DBRequest.findAllGroups.mockReturnValue(promiseState);
            
            // act
            await controllers.getAllGroups(req, res);
    
            // assert
            expect(res.sendStatus).toHaveBeenCalledWith(sendStatus);
        });
    });

    describe('getGroupById', () => {
        test('should return status 200 and send finded group', async () => {
            // arrange
            const group = { group_id: '1982c440-8318-48ed-955e-7d7b193eaf09', group_name: 'Node.js mentoring program', group_permissions: '{"READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"}', createdAt: '2020-01-24', updatedAt: '2020-01-24' };
            req.params.id = '1982c440-8318-48ed-955e-7d7b193eaf09';
            DBRequest.findGroupById.mockReturnValue(Promise.resolve(group));
            
            // act
            await controllers.getGroupById(req, res);
    
            // assert
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(group);
        });

        test.each([
            [Promise.resolve(undefined), 404],
            [Promise.reject(), 500]
        ])('should send error status if %o (%p) (there isn`t any group in database or error occured)', async (promiseState, sendStatus) => {
            // arrange
            req.params.id = 'cb76f90e-6378-402c-84a2-e3b3051bba62';
            DBRequest.findGroupById.mockReturnValue(promiseState);
            
            // act
            await controllers.getGroupById(req, res);
    
            // assert
            expect(res.sendStatus).toHaveBeenCalledWith(sendStatus);
        });
    });

    describe('createGroup', () => {
        test.each([
            [Promise.resolve(expect.any(Object)), 201, expect.any(Object)],
            [Promise.resolve(), 400, 'Transaction failed']
        ])('should return result of creating new user: case %#', async (promiseState, sendStatus, sendItem) => {
            // arrange
            req.body.groupName = 'Node.js mentoring program';
            req.body.permissions = '{"READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"}';
            DBRequest.createGroup.mockReturnValue(promiseState);
            
            // act
            await controllers.createGroup(req, res);
    
            // assert
            expect(res.status).toHaveBeenCalledWith(sendStatus);
            expect(res.send).toHaveBeenCalledWith(sendItem);
        });

        test('should send status 500 if error occured', async () => {
            // arrange
            req.body.groupName = 'Node.js mentoring program';
            req.body.permissions = '{"READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"}';
            DBRequest.createGroup.mockResolvedValue(Promise.reject());
            
            // act
            await controllers.createGroup(req, res);
    
            // assert
            expect(res.sendStatus).toHaveBeenCalledWith(500);
        });
    });

    describe('updateGroupById', () => {
        test.each([
            ['groupName', 'Node.js mentoring program', Promise.resolve(expect.any(Object)), 200, 'Updated successfully'],
            ['permissions', '{"READ", "WRITE", "DELETE"}', Promise.resolve(expect.any(Object)), 200, 'Updated successfully'],
            ['groupName', 'Node.js mentoring program', Promise.resolve(undefined), 400, 'Update failed']
        ])('should send status and message according to initial conditions: case %#', async (propertyToChange, newValue, dbResponse, status, message) => {
            // arrange
            req.params.id = '55df56dc-47af-4e53-b9f1-1f65d013ca66';
            const group = { group_id: '55df56dc-47af-4e53-b9f1-1f65d013ca66', group_name: 'Angular mentoring program', group_permissions: '{"READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"}', createdAt: '2020-01-24', updatedAt: '2020-01-24' };
            req.body[propertyToChange] = newValue;
            DBRequest.findGroupById.mockReturnValue(Promise.resolve(group));
            DBRequest.updateGroupById.mockReturnValue(dbResponse);
            
            // act
            await controllers.updateGroupById(req, res);
    
            // assert
            expect(res.status).toHaveBeenCalledWith(status);
            expect(res.send).toHaveBeenCalledWith(message);
        });

        test.each([
            [Promise.resolve(undefined), 404],
            [Promise.reject(), 500]
        ])('should send error status if %o (%p) (there isn`t any group in database or error occured)', async (promiseState, sendStatus) => {
            // arrange
            req.params.id = '55df56dc-47af-4e53-b9f1-1f65d013ca66';
            DBRequest.findGroupById.mockReturnValue(promiseState);
            
            // act
            await controllers.updateGroupById(req, res);
    
            // assert
            expect(res.sendStatus).toHaveBeenCalledWith(sendStatus);
        });
    });

    describe('deleteGroupById', () => {
        test.each([
            [Promise.resolve(true), 200, 'Deleted successfully'],
            [Promise.resolve(undefined), 400, 'Deletion failed'],
        ])('should send status and message according to initial conditions: case %#', async (dbResponse, status, message) => {
            // arrange
            req.params.id = '55df56dc-47af-4e53-b9f1-1f65d013ca66';
            const group = { group_id: '55df56dc-47af-4e53-b9f1-1f65d013ca66', group_name: 'Angular mentoring program', group_permissions: '{"READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"}', createdAt: '2020-01-24', updatedAt: '2020-01-24' };
            DBRequest.findGroupById.mockReturnValue(Promise.resolve(group));
            DBRequest.deleteGroupById.mockReturnValue(dbResponse);
            
            // act
            await controllers.deleteGroupById(req, res);
    
            // assert
            expect(res.status).toHaveBeenCalledWith(status);
            expect(res.send).toHaveBeenCalledWith(message);
        });

        test.each([
            [Promise.resolve(undefined), 404],
            [Promise.reject(), 500]
        ])('should send error status if %o (%p) (there isn`t any group in database or error occured)', async (promiseState, sendStatus) => {
            // arrange
            req.params.id = '55df56dc-47af-4e53-b9f1-1f65d013ca66';
            DBRequest.findGroupById.mockReturnValue(promiseState);
            
            // act
            await controllers.deleteGroupById(req, res);
    
            // assert
            expect(res.sendStatus).toHaveBeenCalledWith(sendStatus);
        });
    });

    describe('addUsersToGroup', () => {
        test('should send status 201 and message \'Request successful\'', async () => {
            // arrange
            req.params.id = '55df56dc-47af-4e53-b9f1-1f65d013ca66';
            req.body.userIds = ['55df56dc-47af-4e53-b9f1-1f65d013ca66', '7654c440-8318-48ed-955e-7d7b193eaf09', '3452c440-8318-48ed-955e-7d7b193eaf09'];
            DBRequest.addUsersToGroup.mockReturnValue(Promise.resolve(true));
            
            // act
            await controllers.addUsersToGroup(req, res);
    
            // assert
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.send).toHaveBeenCalledWith('Request successful');
        });

        test.each([
            [Promise.resolve(undefined), 404],
            [Promise.reject(), 500]
        ])('should send error status if %o (%p) (there isn`t any group in database or error occured)', async (promiseState, sendStatus) => {
            // arrange
            req.params.id = '55df56dc-47af-4e53-b9f1-1f65d013ca66';
            DBRequest.addUsersToGroup.mockReturnValue(promiseState);
            
            // act
            await controllers.addUsersToGroup(req, res);
    
            // assert
            expect(res.sendStatus).toHaveBeenCalledWith(sendStatus);
        });
    });
});
