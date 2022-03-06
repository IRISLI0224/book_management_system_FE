//All API about user
import backendApi from './backendApi';

const API_GET_USER = '/users';
const API_LOGIN_URL = '/login';
const API_REGISTER_URL = '/register';

export const getUserById = async (id) => {
  const url = `${API_GET_USER}/${id}`;
  const response = await backendApi.get(url);
  return response.data;
};

export const UserLogin = async (email, password) => {
  const data = {
    email,
    password,
  };

  const res = await backendApi.post(API_LOGIN_URL, data).catch(function (e) {
    if (e.response) {
      return e.response;
    }
  });
  return res;
};

export const UserRegister = async (email, password) => {
  const data = {
    email,
    password,
  };

  const res = await backendApi.post(API_REGISTER_URL, data).catch(function (e) {
    if (e.response) {
      return e.response;
    }
  });
  return res;
};
