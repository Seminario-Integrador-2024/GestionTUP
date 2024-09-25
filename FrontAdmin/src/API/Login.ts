import Cookies from 'js-cookie';

const URL = import.meta.env.VITE_URL_DEV;

export const FetchLogin = async (password: string, account: string) => {
  try {
    const response = await fetch(`http://localhost:8000/api/auth/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: account ,password }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      Cookies.set('tokennn', data.access);
      Cookies.set('dni', data.user.dni);
      Cookies.set('refresh_token', data.refresh);
      Cookies.set('access_expiration', data.access_expiration);
      Cookies.set('refresh_expiration', data.refresh_expiration);
      Cookies.set('username', data.user.dni);
      return data;
    } else {
      const errorResponse = await response.json();
      throw new Error(
         JSON.stringify(errorResponse)
      );
    }
  } catch (error: any) {
    throw new Error('' + error);
  }
};
