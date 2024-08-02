const API_URL = 'http://localhost:5000';

export async function addTransaction(data) {
  await fetch(API_URL + '/account', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

export async function updateTransaction(id, data) {
  await fetch(API_URL + `/account/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

export async function deleteTransaction(id) {
  await fetch(API_URL + `/account/${id}`, {
    method: 'DELETE',
  });
}