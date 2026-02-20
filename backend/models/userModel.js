import db from '../config/db.js';

export const createUser = async (name, email) => {
    const query = "INSERT INTO users (name, email) VALUES (?, ?)";
    const [result] = await db.query(query, [name, email]);
    return result;
};

export const getUsers = async () => {
    const [rows] = await db.query("SELECT * FROM users");
    return rows;
};

export const getUserById = async (id) => {
    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows;
};

export const updateUser = async (id, name, email) => {
    const query = "UPDATE users SET name=?, email=? WHERE id=?";
    const [result] = await db.query(query, [name, email, id]);
    return result;
};

export const deleteUser = async (id) => {
    const [result] = await db.query("DELETE FROM users WHERE id=?", [id]);
    return result;
};
