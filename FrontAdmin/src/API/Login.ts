import Cookies from 'js-cookie';

export const FetchLogin = async (
  email_or_username: string,
  password: string
) => {
  try {
    const response = await fetch('https://gestiontup-42tx6kvt3q-uc.a.run.app/users/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email_or_username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      Cookies.set('access_token', data.access);
      Cookies.set('refresh_token', data.refresh);
      Cookies.set('access_expiration', data.access_expiration);
      Cookies.set('refresh_expiration', data.refresh_expiration);
      Cookies.set('username', data.user.username);
      return data;
    } else {
      throw new Error('Login failed');
    }
  } catch (error) {
    throw new Error('Network error: ' + error);
  }
};
