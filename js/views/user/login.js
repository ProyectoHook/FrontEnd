import Navbar from '../../../components/navbar.js'
export default () => {
  return `
    ${Navbar()}
    <div class="container mt-5" style="max-width: 400px;">
          
        <div class="card p-3">
          <h2 class="my-4 text-center">Iniciar Sesión</h2>
          <div class="card-body">
            
            <form id="login-form" novalidate>
              <div class="mb-3">
                <label for="email" class="form-label">Correo electrónico</label>
                <input 
                  type="email" 
                  class="form-control" 
                  id="email" 
                  name="email" 
                  placeholder="ejemplo@correo.com" 
                  required
                >
                <div class="invalid-feedback">
                  Por favor ingresa un correo válido.
                </div>
              </div>

              <div class="mb-3">
                <label for="password" class="form-label">Contraseña</label>
                <input 
                  type="password" 
                  class="form-control" 
                  id="password" 
                  name="password" 
                  placeholder="Contraseña" 
                  required
                >
                <p class="card-text mt-3"><a href="#">Olvidaste la contraseña?</a><p>
                <div class="invalid-feedback">
                  La contraseña debe tener al menos 6 caracteres.
                </div>
              </div>

              <button id="login-btn" type="submit" class="btn btn-primary w-100">Login</button>
            </form>

            <div class="my-3">
              <button id="go-to-register-btn" class="btn btn-secondary">Registrarme</button>
            </div>

          </div>
        </div>
    </div>
    `;
};
