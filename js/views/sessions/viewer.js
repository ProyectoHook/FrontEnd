import Navbar from '../../components/navbar_auth.js';

export default () => {

    `<div class="container mt-4">

        <h2 class="text-center">Join Session & Broadcast Test</h2>
    
    <div class="d-flex m-1 mx-auto justify-content-center align-items-center">
        <div class="m-3">
            <span>Mail:</span>
            <input id="emailInput" class="ms-4" placeholder="Escriba un mail..." />
        </div>
        <div class="m-3">
            <span>Password:</span>
            <input id="passwordInput" class="ms-4" placeholder="Escriba un usuario..." />
        </div>
        <div class="m-3">
            <button class="btn btn-primary" onclick="loginHandler()">Log in</button>
        </div>
    </div> 
    <div class="d-flex m-1 mx-auto justify-content-center align-items-center">
            <span>(Si arroja error verificar que los campos estén completos)</span>
    </div>

    <div class="m-1 d-flex justify-content-center align-items-center">
        <span class="ms-2">Status:</span>
        <span id="loginStatusSpan" class="text-danger fw-bold ms-2"> Not logged in </span>
    </div> 

    <div class="d-flex m-1 mx-auto justify-content-center align-items-center">
        <div class="m-1" style="width: 30%;">
            <span>Session code:</span>
            <input id="sessionCodeInput" class="ms-5" style="width: 50%;" placeholder="Escriba el codigo de sesion..." />
        </div>
        <div class="m-3">
            <button class="btn btn-primary" onclick="joinSessionHandler()">Join Session</button>
        </div>
    </div> 

    <div class="m-1 d-flex justify-content-center align-items-center">
        <span class="ms-2">Status:</span>
        <span id="sessionStatusSpan" class="text-danger fw-bold ms-2"> Not Connected </span>
    </div>

    <div class="container bg-light p-0 border border-dark rounded" style="width: 640px; height: 480px; overflow: hidden;">
        <img id="imgSlideScreen" src="https://i.pinimg.com/736x/53/0d/a3/530da3e6a7400ad49b5a076feb538b6b.jpg"
             class="img-fluid" alt="Imagen" style="object-fit: cover; width: 100%; height: 100%;">
    </div>
        
        </div>
      </div>`;

}