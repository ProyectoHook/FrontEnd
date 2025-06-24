import Navbar from '../../../components/navbar_auth.js';

export default () => {
    return `
      ${Navbar()}
      <div class="container">
        <h2 class="mt-4">Unirse a una sesión</h2>
        <div class="row mt-4">
          <div class="col">
            <input 
              type="text" 
              id="join-session-access-code" 
              class="form-control" 
              placeholder="Código de sesión" 
              maxlength="6"
            >
          </div>
          <div class="col">
            <button 
              id="join-session-btn" 
              class="btn btn-primary w-100"
            >
              Unirse
            </button>
          </div>
        </div>
      </div>
    `;
  };
