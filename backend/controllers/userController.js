import * as User from '../models/userModel.js';

export const createUser = async (req, res) => {
    const { name, email } = req.body;
    await User.createUser(name, email);
    res.send("User created");
};

export const getUsers = async (req, res) => {
    const users = await User.getUsers();
    res.json(users);
};

export const getUserById = async (req, res) => {
    const user = await User.getUserById(req.params.id);
    res.json(user);
};

export const updateUser = async (req, res) => {
    const { name, email } = req.body;
    await User.updateUser(req.params.id, name, email);
    res.send("User updated");
};

export const deleteUser = async (req, res) => {
    await User.deleteUser(req.params.id);
    res.send("User deleted");
};
