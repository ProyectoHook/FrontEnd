import Navbar from '../../components/navbar_auth.js';

export default () => {
    const access_token = sessionStorage.getItem('access_token');
    const expires_in = sessionStorage.getItem('expires_in');
    const refresh_token = sessionStorage.getItem('refresh_token');
    const role = sessionStorage.getItem('role');
    const token_type = sessionStorage.getItem('token_type');
    const user_id = sessionStorage.getItem('user_id');
  
    return `${Navbar()}
      <div class="container mt-4">
        <h2>Sesión Iniciada</h2>
        <div class="card p-3">
          <p><strong>Access Token:</strong> ${access_token}</p>
          <p><strong>Expires In:</strong> ${expires_in}</p>
          <p><strong>Refresh Token:</strong> ${refresh_token}</p>
          <p><strong>Role:</strong> ${role}</p>
          <p><strong>Token Type:</strong> ${token_type}</p>
          <p><strong>User ID:</strong> ${user_id}</p>
        </div>
      </div>
    `;
  };
