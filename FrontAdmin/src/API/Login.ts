export const FetchLogin = async (username : string, email : string, password: string) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/accounts/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username ,email, password }),
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