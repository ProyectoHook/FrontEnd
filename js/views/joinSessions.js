import Navbar from '../../components/navbar_auth.js';

export default () => {
    return `
      ${Navbar()}
      <div class="container">

        <h2 class="mt-4">Crear una sesión ahora</h2>

        <div class="d-flex m-1 mx-auto justify-content-center align-items-center">
            <div class="m-3">
                <span>Descripción (opcional):</span>
                <input id="descriptionInput" class="ms-4" placeholder="Escriba una descripcion" />
            </div>
            <div class="m-3">
                <span>Max Participants:</span>
                <input id="maxParticipantsInput" class="ms-4" placeholder="#" />
            </div>
            <div class="m-3">
                <span>PresentationId:</span>
                <input id="presentationIdInput" class="ms-4" placeholder="#" />
            </div>
        </div> 

        <div class="d-flex m-1 mx-auto justify-content-center align-items-center">
            <span>(Si arroja error verificar que los campos estén completos)</span>
        </div>

        <div class="d-flex m-1 justify-content-center align-items-center">
            <div class="m-3">
                <button id="start-session-btn" class="btn btn-primary">Start Session</button>
            </div>
        </div> 

        <h2 class="mt-4">Crear una sesión para unirse luego</h2>     

        <div class="row mt-4">
          <div class="col">
            <input type="text" id="create-session-access-code" class="form-control" 
              placeholder="Código de sesión" maxlength="6" disabled>
          </div>
          <div class="col">
            <button id="create-session-btn" class="btn btn-primary w-100">
              Generar código de sesión (ver si queremos tener esta feature)
            </button>
          </div>
        </div>

        <h2 class="mt-4">Unirse a una sesión</h2>       

        <div class="d-flex m-1 mx-auto justify-content-center align-items-center">
          <div class="m-1" style="width: 30%;">
            <span>Session code:</span>
            <input id="sessionCodeInput" class="ms-5" style="width: 50%;" placeholder="Escriba el codigo de sesion..." />
          </div>
          <div class="m-3">
            <button id="join-session-button" class="btn btn-primary"Join Session</button>
          </div>
        </div> 
        
        <div class="row mt-4">
          <div class="col">
            <input type="text" id="join-session-access-code" class="form-control" 
              placeholder="Código de sesión" maxlength="6">
          </div>
          <div class="col">
            <button id="join-session-btn" class="btn btn-primary w-100">
              Unirse
            </button>
          </div>
        </div>

      </div>
    `;
  };
