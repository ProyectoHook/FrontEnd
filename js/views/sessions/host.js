import Navbar from '../../components/navbar_auth.js';

export default () => {

    `<div class="container mt-4">

         <h2 class="text-center">Manage Session & Broadcast Test</h2>
    
    <div class="d-flex m-1 mx-auto justify-content-center align-items-center">
        <div class="m-3">
            <span>Description:</span>
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
            <button class="btn btn-primary" onclick="startSessionHandler()">Start Session</button>
        </div>
        <div class="m-1">
            <span>Session code:</span>
            <span id="sessionCodeSpan" class="text-danger fw-bold ms-2">-</span>
        </div>
    </div> 

    <div class="m-2 d-flex justify-content-center align-items-center">
        <span class="ms-2">Status:</span>
        <span id="sessionStatusSpan" class="text-danger fw-bold ms-2">Offline</span>
        <span class="ms-2">Participants:</span>
        <span id="sessionParticipantsSpan" class="text-danger fw-bold ms-2">0</span>
    </div>

    <div class="container bg-light p-0 border border-dark rounded" style="width: 500px; height: 300px; overflow: hidden;">
        <img id="imgSlideScreen" src="https://i.pinimg.com/736x/53/0d/a3/530da3e6a7400ad49b5a076feb538b6b.jpg"
             class="img-fluid" alt="Imagen" style="object-fit: cover; width: 100%; height: 100%;">
    </div>

    <div class="d-flex m-3 mx-auto justify-content-center align-items-center">
        <button id="btn_first" type="button" class="ms-3 btn btn-disabled" disabled="true">First</button>
        <button id="btn_prev" type="button" class="ms-3 btn btn-disabled" disabled="true">Prev</button>
        <button id="btn_goto" type="button" class="ms-3 btn btn-disabled" disabled="true">Go to</button>
            <input id="goToInput" class="ms-3" style="width: 5%;" placeholder="#" disabled="true"/>
        <button id="btn_next" type="button" class="ms-3 btn btn-disabled" disabled="true">Next</button>
        <button id="btn_last" type="button" class="ms-3 btn btn-disabled" disabled="true">Last</button>
    </div>
        
        </div>
      </div>`;


}