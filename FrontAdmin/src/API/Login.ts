import Cookies from 'js-cookie';



export const FetchLogin = async ( legajo: string, contrasenia: string,) => {
  //hice el peor control que se puede hacer, pero no hay tiempo loco
  if (legajo === 'admin@admin.com') {
    console.log('admin');
    const email = legajo;
    const password = contrasenia;
        try {
      const response = await fetch(`http://localhost:8000/api/auth/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email ,password}),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        const roles = data.user.groups[0];
        localStorage.setItem('userRol', JSON.stringify(roles));
        
        Cookies.set('tokennn', data.access);
        Cookies.set('dni', data.user.dni);
        Cookies.set('refresh_token', data.refresh);
        Cookies.set('access_expiration', data.access_expiration);
        Cookies.set('refresh_expiration', data.refresh_expiration);
        Cookies.set('full_name', data.user.full_name);

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
  } else { 
    try {
      const response = await fetch(`http://localhost:8000/api/sysacad/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({legajo ,contrasenia }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        const roles = data.user.groups[0];
        localStorage.setItem('userRol', JSON.stringify(roles));
        
        Cookies.set('tokennn', data.access);
        Cookies.set('dni', data.user.dni);
        Cookies.set('refresh_token', data.refresh);
        Cookies.set('access_expiration', data.access_expiration);
        Cookies.set('refresh_expiration', data.refresh_expiration);
        Cookies.set('full_name', data.user.full_name);

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
  }
}
