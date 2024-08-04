const API_URL = 'http://172.29.12.16:5000';

export async function addTransaction(data) {
  try {
    const response = await fetch(API_URL + '/account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
  } catch (error) {
    throw error;
  }
}

export async function updateTransaction(id, data) {
  try {
    const response = await fetch(API_URL + `/account/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
  } catch (error) {
    throw error;
  }
}

export async function deleteTransaction(id) {
  try {
    const response = await fetch(API_URL + `/account/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
  } catch (error) {
    throw error;
  }
}

export async function getCategories(type) {
  try {
    const response = await fetch(API_URL + `/category/sub?type=${type}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    return response.json();
  } catch (error) {
    throw error;
  }
}

export async function getTransactionDetail(id) {
  try {
    const response = await fetch(API_URL + `/account/detail/${id}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    return response.json();
  } catch (error) {
    throw error;
  }
}

/* 월별 지출 데이터*/
export async function getMonthlyExpenses(year, month) {
  try {
    const response = await fetch(
      API_URL + `/report/expense?year=${year}&month=${month}`,
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    return response.json();
  } catch (error) {
    throw error;
  }
}
