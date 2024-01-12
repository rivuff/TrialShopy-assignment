import { createUser, getUserByEmail } from '../db/users';
import express from 'express'
import {authentication, random} from '../helpers'


export const login =  async(req: express.Request, res: express.Response) =>{
    try {
        const {email, password} = req.body;

        if(!email || !password){
            console.log("error at controller password or email not found");

            return res.sendStatus(400); 
        }

        const user= await getUserByEmail(email)
        console.log(user);
        
        if(!user){
            console.log("error at controller user not found");
            return res.sendStatus(400);
        }

        let expectedHash;

        if(user.authentication?.salt !=undefined){
            console.log(user.authentication.salt);
            console.log(password);
            
            expectedHash = authentication(user.authentication.salt, password)
            console.log(expectedHash);
            
        }

        //console.log(user.authentication?.password);
        
        
        if(user.authentication?.password !== expectedHash){
            console.log("error at controller password not match");
            return res.sendStatus(403);
        }


        const salt = random();
        if(user.authentication != undefined){
            user.authentication.sessionToken = authentication(salt, user._id.toString())
        }

         
        await user.save();

        res.cookie('RIVU-AUTH', user.authentication?.sessionToken, { domain: 'localhost', path: '/'})

        return res.status(200).json(user).end();

    } catch (error) {
        console.log("controller error");
        
        console.log(error);
        return res.sendStatus(400);
    }
}

export const register = async(req: express.Request, res: express.Response) =>{
    try {
        const {email, password, username} = req.body;

        console.log(req.body);
        

        if(!email || !password || !username){
            console.log("error at controller");
            return res.sendStatus(400);
        }

        const existingUser = await getUserByEmail(email);

        if(existingUser){
            return res.sendStatus(400)
        }

        const salt = random();

        const user = await createUser({
            email,
            username,
            authentication:{
                salt,
                password: authentication(salt, password)
            }
        });

        return res.status(200).json(user).end()

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const logout = async (req: express.Request, res: express.Response) => {
    try {
        const {email} = req.body; // Assuming you have authentication middleware that sets req.user

       
        const user = await getUserByEmail(email);
        if(!user){
            return res.status(403).json("no user found")
        }
        if (user.authentication!=undefined) {
            user.authentication.sessionToken = null; // Invalidate the session token
            await user.save();
        }

        // Clear the session token cookie
        res.clearCookie('RIVU-AUTH', { domain: 'localhost', path: '/' });

        return res.status(200).json("logged out");
    } catch (error) {
        console.log("Logout error");
        console.log(error);
        return res.sendStatus(500); // Internal Server Error
    }
};