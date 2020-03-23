import { DBRequest } from '../../src/data-access/user';

module.exports = {
    requestMock: () => {
        const req = {}
        req.body = jest.fn().mockReturnValue(req)
        req.params = jest.fn().mockReturnValue(req)
        req.query = jest.fn().mockReturnValue(req)
        return req
    },
  
    responseMock: () => {
        const res = {}
        res.send = jest.fn().mockReturnValue(res)
        res.status = jest.fn().mockReturnValue(res)
        res.sendStatus = jest.fn().mockReturnValue(res)
        return res
    }
}
