import { USER_SERVICE_URL } from '../data/config.js'
import { SESSION_SERVICE_URL } from '../data/config.js';

export async function loginUser(email, password) {
  try {
    const url = USER_SERVICE_URL + 'api/Auth/login';
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

export async function getSessionByAccessCode(accessCode, token) {
  try {

    const url = `${SESSION_SERVICE_URL}session/${accessCode}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    }

    const error = new Error(data.message || 'Error');
    error.status = response.status;
    throw error;

  } catch (error) {
    console.error('Error al obtener sesión por accessCode:', error);
    throw error;
  }
}


export async function createParticipant(user, session, token) {


  const url = `${SESSION_SERVICE_URL}participant/create`;

  const body = {
    'idUser': user,
    'idSession': session
  }

  console.log(body);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    if (response.ok) {
      console.log('user added as participant', data);
      return data;
    }

    const error = new Error(data.message || 'Error');
    error.status = response.status;
    throw error;

  } catch (error) {
    console.error('Error al agregar el usuario como participante', error);
    throw error;
  }
}



