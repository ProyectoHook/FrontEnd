import Navbar from '../../components/navbar.js';

export default async () => {

  return `
    ${Navbar()}
    <div class="container">
      <h2>Home</h2>
      <p>Bienvenido a la página principal</p>
      <a id="btn-login" href="#/login" class="btn btn-primary mt-3">Ir al Login</a>
    </div>
  `;
};
