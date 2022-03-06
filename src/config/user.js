//All API about user
import backendApi from "./backendApi";

const API_GET_ALL_USER = "/users";
const API_GET_USER = "/users";
const API_CREATE_USER = "/create/user";
const API_UPDATE_USER = "/users";
const API_DELETE_USER = "/users";
const API_RECENT_USERS = "/recent/users";

export const getAllUsers = async () => {
  const url = `${API_GET_ALL_USER}`;
  const response = await backendApi.get(url);
  return response.data;
};

export const getRecentUsers = async () => {
  const url = `${API_RECENT_USERS}`;
  try {
    const response = await backendApi.get(url);
    return response.data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const getUserById = async (id) => {
  const url = `${API_GET_USER}/${id}`;
  const response = await backendApi.get(url);
  return response.data;
};

export const CreateUser = async (email, name, phone, date_of_birth) => {
  const data = {
    email,
    name,
    phone,
    date_of_birth,
  };
  try {
    const res = await backendApi
      .post(API_CREATE_USER, data)
      .catch(function (e) {
        if (e.response) {
          return e.response;
        }
      });
    return res;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const UpdateUserById = async (id, phone, name, date_of_birth) => {
  const data = {
    phone,
    name,
    date_of_birth,
  };
  try {
    const res = await backendApi
      .put(`${API_UPDATE_USER}/${id}`, data)
      .catch(function (e) {
        if (e.response) {
          return e.response;
        }
      });
    return res;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const DeleteUser = async (id) => {
  const url = `${API_DELETE_USER}/${id}`;
  try {
    const response = await backendApi.delete(url);
    return response.data;
  } catch (e) {
    console.log(e);
    return e;
  }
};
