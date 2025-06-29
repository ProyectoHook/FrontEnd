import Navbar from '../../../components/navbar_auth.js';
import { getSlideActualIndex, sendSlideChange } from '../../SignalR/Manager.js';
import { showSlideWaiting } from '../../../components/slideCards.js';

export default async () => {

    return ` 
    
    <div class="container mt-2">

        <div class="m-2 d-flex justify-content-center align-items-center">
            <span class="ms-2">Status:</span>
            <span id="sessionStatusSpan" class="text-danger fw-bold ms-2">Offline</span>
            <span class="ms-2">Participants:</span>
            <span id="sessionParticipantsSpan" class="text-danger fw-bold ms-2">0</span>
            <span class="ms-2">Session code:</span>
            <span id="sessionCodeSpan" class="text-danger fw-bold ms-2">-</span>
            <button id="btn_shareLink" type="button" class="ms-3 btn btn-primary">Compartir Link de sesión</button>
        </div>

        <div class="container bg-light p-0 border border-dark rounded" style="width: 60%; height:80vh; overflow: hidden;">
            <div id="slideCardContainer">
                ${showSlideWaiting()}
            </div>
        </div>

        <div class="d-flex m-3 mx-auto justify-content-center align-items-center">
            <button id="btn_first" type="button" class="ms-3 btn btn-disabled" disabled="true">First</button>
            <button id="btn_prev" type="button" class="ms-3 btn btn-disabled" disabled="true">Prev</button>
            <button id="btn_goto" type="button" class="ms-3 btn btn-disabled" disabled="true">Go to</button>
            <input id="goToInput" class="ms-3" style="width: 5%;" placeholder="#" disabled="true"/>
            <button id="btn_next" type="button" class="ms-3 btn btn-disabled" disabled="true">Next</button>
            <button id="btn_last" type="button" class="ms-3 btn btn-disabled" disabled="true">Last</button>
        </div>

    </div>`;

}
