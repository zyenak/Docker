"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUsers = exports.createUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const createUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await user_1.default.create({ username, password });
        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'User not created' });
    }
};
exports.createUser = createUser;
const getUsers = async (req, res) => {
    try {
        const users = await user_1.default.findAll();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'User not found' });
    }
};
exports.getUsers = getUsers;
const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await user_1.default.findByPk(id);
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(404).json({ error: 'User not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'User not found' });
    }
};
exports.getUserById = getUserById;
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, password } = req.body;
    try {
        const user = await user_1.default.findByPk(id);
        if (user) {
            user.username = username;
            user.password = password;
            await user.save();
            res.status(200).json(user);
        }
        else {
            res.status(404).json({ error: 'User not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: "error fetching user" });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await user_1.default.findByPk(id);
        if (user) {
            await user.destroy();
            res.status(204).json();
        }
        else {
            res.status(404).json({ error: 'User not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Error User not found' });
    }
};
exports.deleteUser = deleteUser;
