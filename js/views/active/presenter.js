import Navbar from '../../../components/navbar_auth.js';
import { getSlideActualIndex, sendSlideChange } from '../../SignalR/Manager.js';
import { showSlideWaiting } from '../../../components/slideCards.js';


export default async () => {
    return `
  ${Navbar()}
    <div class="container mt-2">

      <div class="d-flex justify-content-center align-items-center mb-3 gap-3 flex-wrap">
        <div><strong>Status:</strong> <span id="sessionStatusSpan" class="text-danger fw-bold">Offline</span></div>
        <div><strong>Participants:</strong> <span id="sessionParticipantsSpan" class="text-danger fw-bold">0</span></div>
        <div><strong>Session code:</strong> <span id="sessionCodeSpan" class="text-danger fw-bold">-</span></div>
        <button id="btn_shareLink" type="button" class="btn btn-primary">Compartir Link de sesión</button>
      </div>

      <div class="row">
        <div class="col-md-10 mb-3" id="slideCardContainer">
          ${showSlideWaiting()}
        </div>

        <div class="col-md-2">
          <h6 class="text-center mb-3">Manos levantadas</h6>
          <ul id="listaDeManosLevantadas" class="list-group"></ul>
        </div>
      </div>

      <div class="d-flex justify-content-center align-items-center gap-2 mt-4 flex-wrap">
  <button id="btn_first" type="button" class="d-none btn btn-secondary" disabled>
    <i class="bi bi-skip-backward-fill"></i> First
  </button>

  <button id="btn_prev" type="button" class="btn btn-primary" disabled>
    <i class="bi bi-arrow-left-circle-fill"></i> Anterior
  </button>

  <button id="btn_goto" type="button" class="d-none btn btn-secondary" disabled>
    <i class="bi bi-box-arrow-in-right"></i> Go to
  </button>

  <input id="goToInput" class="d-none form-control" style="width: 4rem;" placeholder="#" disabled />

  <button id="btn_next" type="button" class="btn btn-primary" disabled>
    Siguiente <i class="bi bi-arrow-right-circle-fill"></i>
  </button>

  <button id="btn_last" type="button" class="d-none btn btn-secondary" disabled>
    Last <i class="bi bi-skip-forward-fill"></i>
  </button>
</div>


    </div>
  `;
}
