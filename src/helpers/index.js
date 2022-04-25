import axios from 'axios';

const BASE_URL = 'http://localhost:8000/';

const getError = (errorData) => {
  if (errorData.non_field_errors) {
    return errorData.non_field_errors;
  }
  if (errorData.detail) {
    return errorData.detail;
  }

  return Object.values(errorData)[0][0];
};

const generateHeaders = (token) => ({ headers: { 'Authorization': `Token ${token}` }});

export async function getPostItList() {
  try {
    const response = await axios.get(`${BASE_URL}api/get/`);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function postUser(user) {
  try {
    const response = await axios.post(`${BASE_URL}users/`, user);
    return response.data;
  } catch (error) {
    const { data } = await error.response;
    const errorMessage = getError(data);
    return { error: errorMessage };
  }
}

export async function authUser(user) {
  try {
    const response = await axios.post(`${BASE_URL}auth/`, user);
    return { status: response.status, token: response.data.token };
  } catch (error) {
    const { data } = await error.response;
    const errorMessage = getError(data)[0];
    return { error: errorMessage };
  }
}

export async function postPostIt(postIt, token) {
  try {
    const response = await axios.post(`${BASE_URL}api/postit/`, postIt, generateHeaders(token));
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function putPostIt(id, postIt, token) {
  try {
    const response = await axios.put(`${BASE_URL}api/postit/${id}/`, postIt, generateHeaders(token));
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function deletePostIt(id, token) {
  try {
    const response = await axios.delete(`${BASE_URL}api/postit/${id}/`, generateHeaders(token));
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}
