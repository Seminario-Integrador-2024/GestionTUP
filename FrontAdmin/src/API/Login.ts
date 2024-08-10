export const FetchLogin = async (email_or_username : string, password: string) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/users/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email_or_username, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Login successful', data);
        return data;
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Network error', error);
    }
  }