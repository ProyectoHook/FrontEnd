import { showSlideWaiting } from '../../../components/slideCards.js';

export default async (sessionCode) => {

    return  ` 

    <div class="m-1 d-flex justify-content-center align-items-center">
        <span class="ms-2">Status:</span>
        <span id="sessionStatusSpan" class="text-danger fw-bold ms-2"> Not Connected </span>
        <span class="ms-2">Session code:</span>
        <span id="sessionCodeSpan" class="text-danger fw-bold ms-2">-</span>
    </div>

    <div class="container">
        <div class="row">
            <div class="col">
            </div>
            <div class="col-3 container bg-light p-0 border border-dark rounded " style="width: 75%; height:90vh; overflow: hidden;">
                <div id="slideCardContainer">
                    ${showSlideWaiting()}
                </div>
            </div>
            <div class="col">
                <button id="raise-hand-btn" type="button" class="btn btn-primary" data-bs-dismiss="modal">
                    <i class="bi bi-person-raised-hand fs-1"></i>
                </button>
            </div>
        </div>
    </div>`; 

}