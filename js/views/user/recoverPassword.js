import Navbar from "../../../components/navbar.js";
export default () => {
  return `
    ${Navbar()}
    <div class="container mt-5" style="max-width: 400px;">
          
        <div class="card p-3">
          <h2 class="my-4 text-center">Recuperar contraseña</h2>
          <div class="card-body">
            
            <form id="recover-form" class ="recover-form" novalidate>
              <div class="mb-3">
                <label for="email" class="form-label">Ingrese su correo electrónico</label>
                <input 
                  type="email" 
                  class="form-control" 
                  id="email" 
                  name="email" 
                  placeholder="ejemplo@correo.com" 
                  autocomplete="email"
                  required
                >
                <div class="invalid-feedback">
                  Por favor ingresa un correo válido.
                </div>

                <p class="legend">
                  Se le enviara un correo al email ingresado con la nueva contraseña.
                </p>

              </div>
              <button id="recoverBtn" type="submit" class="btn btn-primary w-100">Enviar</button>
              <div class="errorDiv">
                  <p class="error" id="error">
                  No existe cuenta asociada a ese email
              </p>
              </div>
              <div id="loader" class="text-center" style="display: none;">
                <div class="spinner-border" role="status" style="color: #f1634a;">
                  <span class="visually-hidden">Cargando...</span>
                </div>
                <div class="mt-2" style="color: #f1634a; font-weight: 500;">
                  Aguarde un momento...
                </div>
              </div>
            </form>
          </div>
        </div>
        <dialog class ="dialogCompleted" id ="recoveryCompleted" aria-label>
          <div class ="completedDiv">
            <span class="dialogText">¡Mail enviado!</span>
            <button class="completedBtn" id="sendBttn">
            <span>Volver al login</span>
            </button>
          </div>
        </dialog>
    </div>
    `;
};
