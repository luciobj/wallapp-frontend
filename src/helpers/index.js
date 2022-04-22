const BASE_URL = 'http://localhost:8000/';

export async function getPostItList() {
  try {
    const result = await fetch(`${BASE_URL}api/get/`);
    return await result.json();
  } catch (error) {
    console.log(error);
  }
}

export async function postUser(user) {
  try {
    const result = await fetch(`${BASE_URL}user/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return await result.json();
  } catch (error) {
    console.log(error);
  }
}

export async function authUser(user) {
  try {
    const result = await fetch(`${BASE_URL}auth/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return await result.json();
  } catch (error) {
    console.log(error);
  }
}

export async function postPostIt(postIt, token) {
  try {
    const result = await fetch(`${BASE_URL}api/postit/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
      body: JSON.stringify(postIt),
    });
    return await result.json();
  } catch (error) {
    console.log(error);
  }
}

export async function putPostIt(id, postIt, token) {
  try {
    const result = await fetch(`${BASE_URL}api/postit/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
      body: JSON.stringify(postIt),
    });
    return await result.json();
  } catch (error) {
    console.log(error);
  }
}

export async function deletePostIt(id, token) {
  try {
    const result = await fetch(`${BASE_URL}api/postit/${id}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${token}`,
      },
    });
    return await result.json();
  } catch (error) {
    console.log(error);
  }
}
