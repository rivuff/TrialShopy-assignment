import express from 'express'
//import authentication from './authentication';
import authentication from './authentication'
import users from './users';
import product from './product';
import categry from './categry';
import review from './review';

const router = express.Router();

export default (): express.Router =>{
    authentication(router)
    users(router)
    product(router)
    categry(router)
    review(router)
    return router;
}