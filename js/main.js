import router from './router.js';
import { createParticipant, getSessionByAccessCode, loginUser, getPresentation, registerUser, recoverPassword } from './api.js'
import { startSignalRConnection, joinSessionGroup } from './SignalR/Manager.js';
import { startSessionHandler, iniciarSignalR } from './Services/SignalR/signalR.js';
import { joinSessionHandler } from './Services/SessionServices/joinSession.js';
import qrModal from '../components/qrModal.js';
import { connection } from './Services/SessionServices/joinSession.js'; //conexion de participante

document.addEventListener('DOMContentLoaded', () => {

    console.log("Iniciando main.js")

    

    router();


    //delegacion de evento 'click' (carga el addEventListener para click para todo el DOM)
    document.addEventListener('click', async (event) => {

        //Descomentar para debug
        //console.log(event.target);

        //click en elemento exacto  -->  if (event.target.matches("#join-session-btn")) { ...  }
        //click en algun hijo dentro de ese elemento --> if (event.target.closest('idDelElemento')) { ... }

        //Presenter
        /*if (event.target.matches("#create-session-btn")) {

            //alert("este seria para crear la sesion el codigo y que se conecte en otro momento...");

            var sessioncode = "ABC123"

            location.hash = `#/active/presenter/${sessioncode}`;

        }*/

        //Presenter (start_btn)
        if (event.target.matches("#start-session-btn")) {

            //se crea la sesión
            await startSessionHandler();

            console.log("renderizando vista de presentacion (presentador)");

            const accessCode = localStorage.getItem("accessCode");

            //dispara el evento
            location.hash = `#/active/presenter/${accessCode}`;

            //aqui dentro se hace el invoke para cargar el primer slide (signalR.js - linea 110)
            await iniciarSignalR();

        }

        //Participant
        if (event.target.matches('#join-session-button')) {

            console.log("renderizando vista de presentacion (participante)");

            const accessCode = document.getElementById("sessionCodeInput").value;
            localStorage.setItem("accessCode", accessCode);

            //dispara el evento
            location.hash = `#/active/participant/${accessCode}`;

            await joinSessionHandler();
        }

        //sendAnswer
        if (event.target.matches('#sendAnswer-btn')) {

            alert("Enviando respuesta (el endpoint deberia validar si el usuario ya respondio en esta sesion). Ver como hacer para que si no contesto nada, y el profe pasa la diapo que no pueda volver (puede verificar el currentSlide, si no estas en esa diapo => ya paso la diapo => no te deja. tb podes guardar algo como una lista de (currentSlide,enableBtn) que los deshabilite si se adelantan o retroceden las diapos ");

            var userId = localStorage.getItem("user_id");
            var sessionId = JSON.parse(localStorage.getItem("sessionId"));
            var currentSlideIndex = localStorage.getItem('currentSlide');
            var sortedSlides = JSON.parse(localStorage.getItem("slides"));
            var currentSlide = sortedSlides[currentSlideIndex - 1];

            //console.log("Answer: ", answerPicked);  // --> ver qué conviene mandarle aca

            //document.getElementById(listItem1).value
            //document.getElementById(listItem2).value
            //document.getElementById(listItem3).value


            const answerRequest = {
                sessionId: sessionId,
                slideId: currentSlide.idSlide,
                userId: userId,
                answer: "banana"
            }

            console.log("answerRequest")
            console.log(answerRequest)

            alert("enviando")

            await connection.invoke("SubmitAnswer", sessionId, answerRequest);

            alert("Si responde se deshabilita botón");

            const answerBtn = document.getElementById("sendAnswer-btn");
            answerBtn.classList.add('disabled');

        }

        //qrModal
        if (event.target.matches('#btn_shareLink')) {

            alert("Mostrando modal con QRcode");

            var link_url = 'https://www.google.com' //(luego modificar)

            /*
            new QRCode(qrContainer, {    // aca pone el qr
                text: link_url,
                width: 128,
                height: 128,
                colorDark: "#000000",       //podes cambiarlo
                colorLight: "#ffffff",    //podes cambiarlo
                correctLevel: QRCode.CorrectLevel.H   //no se que hace, ver 
            });

            console.log("qrContainer: ", qrContainer);
            */

            const qrModalContainer = document.getElementById("modal");
            var qrContainer = `<h1>Aqui va el  QR Code</h1>`;
            qrModalContainer.innerHTML = qrModal(link_url, qrContainer);

        }

        if (event.target.closest('#raise-hand-btn')) {

            //tenes que enviarle el estado del boton
            //Si se cae la conexion del participante se reinicia el estado pero no la lista

            const btn = document.getElementById("raise-hand-btn");
            var raiseHand_btn;

            if (btn.classList.contains("btn-primary")) {
                alert("levantando la mano")
                btn.classList.add("btn-warning");
                btn.classList.remove("btn-primary");
                raiseHand_btn = true;
            }
            else {
                alert("Bajando la mano")
                btn.classList.add("btn-primary");
                btn.classList.remove("btn-warning");
                raiseHand_btn = false;
            }

            var userId = localStorage.getItem("user_id");
            var sessionId = JSON.parse(localStorage.getItem("sessionId"));
            var userName = "Te falta enviar el userName"

            await connection.invoke("RaiseHand", sessionId, userId, userName, raiseHand_btn);

        }

    });

});

document.addEventListener('submit', async (event) => {
    if (event.target.matches('#login-form')) {
        event.preventDefault();

        const form = event.target;
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }

        // Lógica de login con valores
        const email = form.email.value;
        const password = form.password.value;

        try {
            const response = await loginUser(email, password);
            alert('Usuario correctamente logueado');

            const access_token = response.access_token;
            const expires_in = response.expires_in;
            const refresh_token = response.refresh_token;
            const role = response.role;
            const token_type = response.token_type;
            const user_id = response.user_id;

            localStorage.setItem('access_token', access_token);
            localStorage.setItem('expires_in', expires_in);
            localStorage.setItem('refresh_token', refresh_token);
            localStorage.setItem('role', role);
            localStorage.setItem('token_type', token_type);
            localStorage.setItem('user_id', user_id);
            //alert("falta traer el username y guardarlo");

            // Redirección a /SesionIniciada
            location.hash = '#/presentations';
        } catch (error) {
            alert('Error al loguearse ', error);
        }


        console.log('Login con:', email, password);

    }
});


//registrar usuario

document.addEventListener("submit", async (event) => {
    if (event.target.matches("#register-form")) {
        event.preventDefault();
        const error = document.getElementById("error");
        error.style.visibility = "hidden";

        const form = event.target;

        if (!form.checkValidity()) {
            form.classList.add("was-validated");
            return;
        }

        try {
            const name = document.getElementById("nombre");
            const email = document.getElementById("email");
            const password = document.getElementById("password");
            const dialog = document.getElementById("registerCompleted");
            const acceptBtn = document.getElementById("acceptBtn");

            const requestData = {
                name: name.value,
                email: email.value,
                password: password.value,
            };

            const data = await registerUser(requestData);
            if (data) {
                dialog.showModal();

                acceptBtn.addEventListener("click", () => {
                    dialog.close();
                    window.location.hash = "#/login";
                });
            } else if (!data) {
                error.style.visibility = "visible";
            }
        } catch (err) {
            alert(err);
        }
    }
});


//Restaurar contraseña

document.addEventListener("submit", async (event) => {
    if (event.target.matches("#recover-form")) {
        event.preventDefault();
        const error = document.getElementById("error");
        const loader = document.getElementById("loader");
        const btn = document.getElementById("sendBttn");
        const recoverBtn = document.getElementById("recoverBtn");

        const form = event.target;

        error.style.visibility = "hidden";

        if (!form.checkValidity()) {
            form.classList.add("was-validated");
            return;
        }
        try {
            // Mostrar loader y deshabilitar botón
            loader.style.display = "block";
            recoverBtn.disabled = true;

            const email = document.getElementById("email");
            const dialog = document.getElementById("recoveryCompleted");

            const requestData = {
                email: email.value,
            };

            const data = await recoverPassword(requestData);

            // Ocultar loader y habilitar botón
            loader.style.display = "none";

            if (data) {
                dialog.showModal();
                btn.addEventListener("click", () => {
                    dialog.close();
                    window.location.hash = "#/login";
                });
            } else {
                error.style.visibility = "visible";
            }
        } catch (err) {
            loader.style.display = "none";
            btn.disabled = false;
            alert(err);
        }
    }
});
