import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080/api/v1'
    : 'https://desolate-everglades-87987.herokuapp.com/api/v1/';

const backendApi = axios.create({
  baseURL: baseURL,
});

export default backendApi;
