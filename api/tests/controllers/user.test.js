import { requestMock, responseMock } from './commonMocks';
import { controllers } from '../../src/controllers/user';
import { DBRequest } from '../../src/data-access/user';
jest.mock('../../src/data-access/user');

describe('user controller', () => {
    let req = null;
    let res = null;

    beforeEach(() => {
        req = requestMock();
        res = responseMock();
    });

    describe('getUsers', () => {
        test.each([
            [undefined, undefined, [{ login: 'svetlo1' }, { login: 'svetlo5' }, { login: 'svetlo3' }, { login: 'svetlo4' }]],
            ['svet', 3, [{ login: 'svetlo1' }, { login: 'svetlo3' }, { login: 'svetlo4' }]]
        ])('should return status 200 and send array of users in accordance with the initial conditions (loginSubstring = %p, limit = %p)', async (loginSubstring, limit, usersArray) => {
            // arrange
            req.query.loginSubstring = loginSubstring;
            req.query.limit = limit;
            DBRequest.findAllUsers.mockReturnValue(Promise.resolve(usersArray));
            DBRequest.findUsersBySubstring.mockReturnValue(Promise.resolve(usersArray));
            
            // act
            await controllers.getUsers(req, res);
    
            // assert
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(usersArray);
        });
        
        test.each([
            [Promise.resolve([]), 404],
            [Promise.resolve(undefined), 404],
            [Promise.reject(), 500]
        ])('should send error status if %o (%p) (database doesn\'t exist or empty or error occured)', async (promiseState, sendStatus) => {
            // arrange
            req.query.loginSubstring = undefined;
            req.query.limit = undefined;
            DBRequest.findAllUsers.mockReturnValue(promiseState);
            
            // act
            await controllers.getUsers(req, res);
    
            // assert
            expect(res.sendStatus).toHaveBeenCalledWith(sendStatus);
        });
    });

    describe('getUserById', () => {
        test('should return status 200 and send finded user', async () => {
            // arrange
            const user = { id: 'cb76f90e-6378-402c-84a2-e3b3051bba62', login: 'svetlo1', password: 'temno1', age: 27, isDeleted: false, createdAt: '2020-01-24', updatedAt: '2020-01-24' };
            req.params.id = 'cb76f90e-6378-402c-84a2-e3b3051bba62';
            DBRequest.findUserById.mockReturnValue(Promise.resolve(user));
            
            // act
            await controllers.getUserById(req, res);
    
            // assert
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(user);
        });

        test.each([
            [Promise.resolve(undefined), 404],
            [Promise.reject(), 500]
        ])('should send error status if %o (%p) (there isn`t any user in database or error occured)', async (promiseState, sendStatus) => {
            // arrange
            req.params.id = 'cb76f90e-6378-402c-84a2-e3b3051bba62';
            DBRequest.findUserById.mockReturnValue(promiseState);
            
            // act
            await controllers.getUserById(req, res);
    
            // assert
            expect(res.sendStatus).toHaveBeenCalledWith(sendStatus);
        });
    });

    describe('postUser', () => {
        test.each([
            [Promise.resolve(expect.any(Object)), 201, expect.any(Object)],
            [Promise.resolve(), 400, 'Transaction failed']
        ])('should return result of creating new user: case %#', async (promiseState, sendStatus, sendItem) => {
            // arrange
            req.body.login = "svetlo1";
            req.body.password = "temno1";
            req.body.age = 27;
            req.body.isDeleted = false;
            DBRequest.createUser.mockReturnValue(promiseState);
            
            // act
            await controllers.postUser(req, res);
    
            // assert
            expect(res.status).toHaveBeenCalledWith(sendStatus);
            expect(res.send).toHaveBeenCalledWith(sendItem);
        });

        test('should send status 500 if error occured', async () => {
            // arrange
            req.body.login = "svetlo1";
            req.body.password = "temno1";
            req.body.age = 27;
            req.body.isDeleted = false;
            DBRequest.createUser.mockResolvedValue(Promise.reject());
            
            // act
            await controllers.postUser(req, res);
    
            // assert
            expect(res.sendStatus).toHaveBeenCalledWith(500);
        });
    });

    describe('updateUserById', () => {
        test.each([
            ['login', 'svetlo2', Promise.resolve(expect.any(Object)), 200, 'Updated successfully'],
            ['password', 'temno2', Promise.resolve(expect.any(Object)), 200, 'Updated successfully'],
            ['age', 34, Promise.resolve(expect.any(Object)), 200, 'Updated successfully'],
            ['isDeleted', true, Promise.resolve(expect.any(Object)), 200, 'Updated successfully'],
            ['login', 'svetlo2', Promise.resolve(undefined), 400, 'Update failed'],
        ])('should send status and message according to initial conditions: case %#', async (propertyToChange, newValue, dbResponse, status, message) => {
            // arrange
            req.params.id = 'cb76f90e-6378-402c-84a2-e3b3051bba62';
            const user = { user_id: 'cb76f90e-6378-402c-84a2-e3b3051bba62', user_login: 'svetlo1', user_password: 'temno1', user_age: 27, user_isDeleted: false, createdAt: '2020-01-24', updatedAt: '2020-01-24' };
            req.body[propertyToChange] = newValue;
            DBRequest.findUserById.mockReturnValue(Promise.resolve(user));
            DBRequest.updateUserById.mockReturnValue(dbResponse);
            
            // act
            await controllers.updateUserById(req, res);
    
            // assert
            expect(res.status).toHaveBeenCalledWith(status);
            expect(res.send).toHaveBeenCalledWith(message);
        });

        test.each([
            [Promise.resolve(undefined), 404],
            [Promise.reject(), 500]
        ])('should send error status if %o (%p) (there isn`t any user in database or error occured)', async (promiseState, sendStatus) => {
            // arrange
            req.params.id = 'cb76f90e-6378-402c-84a2-e3b3051bba62';
            DBRequest.findUserById.mockReturnValue(promiseState);
            
            // act
            await controllers.updateUserById(req, res);
    
            // assert
            expect(res.sendStatus).toHaveBeenCalledWith(sendStatus);
        });
    });

    describe('deleteUserById', () => {
        test.each([
            [Promise.resolve(true), 200, 'Deleted successfully'],
            [Promise.resolve(undefined), 400, 'Deletion failed'],
        ])('should send status and message according to initial conditions: case %#', async (dbResponse, status, message) => {
            // arrange
            req.params.id = 'cb76f90e-6378-402c-84a2-e3b3051bba62';
            const user = { user_id: 'cb76f90e-6378-402c-84a2-e3b3051bba62', user_login: 'svetlo1', user_password: 'temno1', user_age: 27, user_isDeleted: false, createdAt: '2020-01-24', updatedAt: '2020-01-24' };
            DBRequest.findUserById.mockReturnValue(Promise.resolve(user));
            DBRequest.deleteUserById.mockReturnValue(dbResponse);
            
            // act
            await controllers.deleteUserById(req, res);
    
            // assert
            expect(res.status).toHaveBeenCalledWith(status);
            expect(res.send).toHaveBeenCalledWith(message);
        });

        test.each([
            [Promise.resolve(undefined), 404],
            [Promise.reject(), 500]
        ])('should send error status if %o (%p) (there isn`t any user in database or error occured)', async (promiseState, sendStatus) => {
            // arrange
            req.params.id = 'cb76f90e-6378-402c-84a2-e3b3051bba62';
            DBRequest.findUserById.mockReturnValue(promiseState);
            
            // act
            await controllers.deleteUserById(req, res);
    
            // assert
            expect(res.sendStatus).toHaveBeenCalledWith(sendStatus);
        });
    });
});
