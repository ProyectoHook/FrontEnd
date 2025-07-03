import Navbar from "../../../components/navbar_auth.js";

export default async (sessionCode, slide) => {
  return `
    ${Navbar()}

    <div class="slide-wrapper d-flex flex-column overflow-hidden px-3 py-2">

      <!-- Estado de sesión -->
      <div class="d-flex justify-content-center align-items-center gap-2 mb-2">
        <span>Status:</span>
        <span id="sessionStatusSpan" class="text-danger fw-bold">Not Connected</span>
        <span>Session code:</span>
        <span id="sessionCodeSpan" class="text-danger fw-bold">${sessionCode ?? "-"}</span>
      </div>

      <!-- Slide + botón levantar mano -->
      <div class="row flex-grow-1 m-0 g-2">
        
        <div id="slide-container" class="col-11 p-0 d-flex flex-column border rounded shadow-sm bg-white overflow-hidden">
          <!-- contenido dinámico aquí -->
        </div>

        <div class="col-1 d-flex flex-column justify-content-start align-items-center p-0">
          <button id="raise-hand-btn" type="button" class="btn btn-primary w-100 h-100 d-flex justify-content-center align-items-center" title="Levantar mano">
            <i class="bi bi-person-raised-hand fs-1"></i>
          </button>
        </div>

      </div>
    </div>
  `;
};
