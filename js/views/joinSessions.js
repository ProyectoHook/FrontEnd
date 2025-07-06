import Navbar from '../../components/navbar_auth.js';

export default () => {
  return `
    ${Navbar()}
    <div class="container mt-4">

      <h2 class="mb-3">Unirse a una sesión</h2>

      <div class="row align-items-center mb-5">
        <div class="col-md-6">
          <label for="sessionCodeInput" class="form-label">Código de sesión:</label>
          <input id="sessionCodeInput" class="form-control" placeholder="Escriba el código de sesión..." />
        </div>
        <div class="col-md-6 mt-3 mt-md-0 text-md-start">
          <button id="join-session-button" class="btn btn-primary">Unirse a la sesión</button>
        </div>
      </div>

    </div>
  `;
};
