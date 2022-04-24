import axios from 'axios';

const BASE_URL = 'http://localhost:8000/';

const generateHeaders = (token) => ({ headers: { 'Authorization': `Token ${token}` }});

export async function getPostItList() {
  try {
    const response = await axios.get(`${BASE_URL}api/get/`);
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function postUser(user) {
  try {
    const response = await axios.post(`${BASE_URL}users/`, user);
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function authUser(user) {
  try {
    const response = await axios.post(`${BASE_URL}auth/`, user);
    return { status: response.status, token: response.data.token };
  } catch (error) {
    return error;
  }
}

export async function postPostIt(postIt, token) {
  try {
    const response = await axios.post(`${BASE_URL}api/postit/`, postIt, generateHeaders(token));
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function putPostIt(id, postIt, token) {
  try {
    const response = await axios.put(`${BASE_URL}api/postit/${id}/`, postIt, generateHeaders(token));
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function deletePostIt(id, token) {
  try {
    const response = await axios.delete(`${BASE_URL}api/postit/${id}/`, generateHeaders(token));
    return response.data;
  } catch (error) {
    return error;
  }
}
