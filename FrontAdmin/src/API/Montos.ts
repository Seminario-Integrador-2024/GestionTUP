export const FetchMontos = async () => {
    try {
      const response = await fetch('http://localhost:8000/core/compromisos/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      throw new Error('Network error: ' + error);
    }
  }