import express from 'express'
import merge from 'lodash/merge'
import get from 'lodash/get'
import { getUserBySessionToken } from '../db/users'


// Middleware to check if the user making the request is the owner of the account

export const isOwner = async(req: express.Request, res: express.Response, next: express.NextFunction ) =>{
    try {
        const {id} = req.params;
        const currentUserId= get(req, 'identity._id') as unknown as string;

        if(!currentUserId){
            return res.sendStatus(403).json("no user foud")
        }

        if(currentUserId.toString()!== id){
            return res.sendStatus(403).json("does not match id")
        }

        next();
    } catch (error) {
        console.log("middleware",error);
        return res.status(400).json(error)        
    }
}

// Middleware to check if the user making the request is authenticated

export const isAuthenticated =async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies['RIVU-AUTH'];

        if(!sessionToken){
            return res.sendStatus(403);
        }

        const existingUser = await getUserBySessionToken(sessionToken)

        if(!existingUser){
            console.log("no user found at middleware");
            return res.sendStatus(403);
        }

        merge(req, {identity: existingUser});

        return next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400)
        
    }
}