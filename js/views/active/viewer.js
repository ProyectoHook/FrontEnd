import { showSlideWaiting } from '../../../components/slideCards.js';

export default async (sessionCode) => {

    return  ` 

    <div class="m-1 d-flex justify-content-center align-items-center">
        <span class="ms-2">Status:</span>
        <span id="sessionStatusSpan" class="text-danger fw-bold ms-2"> Not Connected </span>
        <span class="ms-2">Session code:</span>
        <span id="sessionCodeSpan" class="text-danger fw-bold ms-2">-</span>
    </div>

    <div class="container bg-light p-0 border border-dark rounded" style="width: 60%; height:80vh; overflow: hidden;">
        <div id="slideCardContainer">
            ${showSlideWaiting()}
        </div>
    </div>
    
    <h2 class="text-center">Session code: ${sessionCode}</h2>`;

/*
    `
     <div class="container mt-4">
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

    
    </div>`; */

}