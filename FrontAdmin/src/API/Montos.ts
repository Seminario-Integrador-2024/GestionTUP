import Cookies from 'js-cookie';

export const FetchMontos = async () => {
  try {
    // Obtén el token de acceso de las cookies
    const accessToken = Cookies.get('access');

    const response = await fetch('http://localhost:8000/pagos/compromisos/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0MTg5MzU3LCJpYXQiOjE3MjQxODU3NTcsImp0aSI6ImRmODM2Zjc0ZTI4ZjQwYzRhM2Y0YzNlMjk4YzE5NjQ2IiwidXNlcl9pZCI6MX0.zuyyU-KLYRpNfzKzcG0MTvelEf4V7p0Tx10AyQhnyN0'}`,
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
