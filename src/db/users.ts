"use strict"
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    authentication:{
        password: {type: String, required: true, select: false},
        salt: { type: String, select: false},
        sessionToken: { type: String, select: false}
    } 
})


export const UserModel = mongoose.model('User', UserSchema)

// Function to get all users
export const getUsers = () => UserModel.find();

// Function to get user by email
export const getUserByEmail = (email: string) => UserModel.findOne({ email });

// Function to get user by session token
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({
    'authentication.sessionToken': sessionToken,
});

// Function to get user by ID
export const getUserById = (id: string) => UserModel.findById(id);

// Function to create a new user
export const createUser = (values: Record<string, any>) => new UserModel(values)
    .save().then((user) => user.toObject());

// Function to delete user by ID
export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id });

// Function to update user by ID
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);

