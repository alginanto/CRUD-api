import pool from "../config/db.js";


export const getAllUserService=async () => {
    const query = 'SELECT * FROM users';
    try {
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        throw error;
    }
}
export const getUserByIdService=async (id) => {
    const query = 'SELECT * FROM users WHERE id = $1';
    try {
        const result = await pool.query(query, [id]);
        return result.rows[0];
    } catch (error) {
        throw error;
        
    }
}
export const createUserService=async (name,email) => {
    const query = 'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *';
    try {
        const result = await pool.query(query, [name, email]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
}
export const updateUserService=async (id,name,email) => {
    const query = 'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *';
    try {
        const result = await pool.query(query, [name, email, id]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
}
export const deleteUserService=async (id) => {
    const query = 'DELETE FROM users WHERE id = $1 RETURNING *';
    try {
        const result = await pool.query(query, [id]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
}