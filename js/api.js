import { USER_SERVICE_URL} from '../data/config.js'

export async function loginUser(email, password) {
  try {
    const url = USER_SERVICE_URL+'api/Auth/login';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      throw new Error(`Error en la respuesta: ${response.status}`);
    }

    const data = await response.json();
    console.log('Respuesta del login:', data);
    return data;
  } catch (error) {
    console.error('Error en la llamada login:', error);
    throw error;
  }
}




