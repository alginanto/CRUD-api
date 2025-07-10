import { createUserService, getAllUserService, getUserByIdService, updateUserService, deleteUserService } from '../models/userModel.js';

//standardized resposne function

const handleResponse = (res, statusCode, data, message) => {
  res.status(statusCode).json({
    status: statusCode,
    message: message || 'Success',
    data: data || null,
  });
}


export const createUser= async (req, res) => {

  const { name, email } = req.body;

  try {
    const newUser = await createUserService(name, email);
    handleResponse(res, 201, newUser, 'User created successfully');
  } catch (error) {
    handleResponse(res, 500, null, 'Error creating user');
    next(error);
  }
}

export const getAllUsers= async (req, res) => {
  try {
    const users = await getAllUserService();
    handleResponse(res, 200, users, 'Users retrieved successfully');
  } catch (error) {
    handleResponse(res, 500, null, 'Error retrieving users');
    next(error);
  }
}

export const getUserById= async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUserByIdService(id);
    if(!user) {
      return handleResponse(res, 404, null, 'User not found');
    }
    handleResponse(res, 200, user, 'User retrieved successfully');
  } catch (error) {
    handleResponse(res, 500, null, 'Error retrieving user');
    next(error);
  }
}



export const updateUser= async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const user = await updateUserService(id, name, email);
    if(!user) {
      return handleResponse(res, 404, null, 'User not found');
    }
    handleResponse(res, 200, user, 'User updated successfully');
  } catch (error) {
    handleResponse(res, 500, null, 'Error updating user');
    next(error);
  }
}

export const deleteUser= async (req, res) => {
  const { id } = req.params;
  try {
    const user = await deleteUserService(id);
    if(!user) {
      return handleResponse(res, 404, null, 'User not found');
    }
    handleResponse(res, 200, user, 'User deleted successfully');
  } catch (error) {
    handleResponse(res, 500, null, 'Error deleting user');
    next(error);
  }
}
