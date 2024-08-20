import Cookies from 'js-cookie';

export const FetchMontos = async () => {
  try {
    // Obtén el token de acceso de las cookies
    const accessToken = Cookies.get('access');

    const response = await fetch('http://localhost:8000/pagos/compromisos/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0MTI4MjQyLCJpYXQiOjE3MjQxMjQ2NDIsImp0aSI6ImQxMWVkM2UxNTdjZDRlOGZhODI2OTU3ODE0ODE0MGJjIiwidXNlcl9pZCI6MX0.Lg6Ip4OimkuqvtfxHG845Qzr-LUpycMVXjXNAs9i6DE"}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Authorization failed');
    }
  } catch (error) {
    throw new Error('Network error: ' + error);
  }
};
