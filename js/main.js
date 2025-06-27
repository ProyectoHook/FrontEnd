import router from './router.js';
import { createParticipant, getSessionByAccessCode, loginUser, getPresentation } from './api.js'
import { startSignalRConnection, joinSessionGroup } from './SignalR/Manager.js';
import { startSessionHandler, iniciarSignalR } from './Services/SignalR/signalR.js';
import { joinSessionHandler } from './Services/SessionServices/joinSession.js';

document.addEventListener('DOMContentLoaded', () => {

    console.log("Iniciando main.js")

    router();

    //delegación de evento 'input'
    document.addEventListener("input", (event) => {

        if (event.target.matches("#idDelElemento")) {

            console.log("Cambio en el elemento", event.target.value);
            console.log("hace algo")

        }

    });

    //delegacion de evento 'click' (carga el addEventListener para click para todo el DOM)
    document.addEventListener('click', async (event) => {

        console.log("click");

        //click en elemento exacto  -->  if (event.target.matches("#join-session-btn")) { ...  }
        //click en algun hijo dentro de ese elemento --> if (event.target.closest('idDelElemento')) { ... }

        //Presenter
        if (event.target.matches("#create-session-btn")) {

            alert("este seria para crear la sesion el codigo y que se conecte en otro momento...");

            var sessioncode = "ABC123"

            location.hash = `#/active/presenter/${sessioncode}`;

        }

        //Presenter (start_btn)
        if (event.target.matches("#start-session-btn")) {

            //se crea la sesión
            await startSessionHandler();

            console.log("renderizando vista de presentacion (presentador)");
    
            const accessCode = sessionStorage.getItem("accessCode");

            //dispara el evento
            location.hash = `#/active/presenter/${accessCode}`;          

            //aqui dentro se hace el invoke para cargar el primer slide (signalR.js - linea 110)
            await iniciarSignalR();

        }

        //Participant
        if (event.target.matches('#join-session-button')) { 

            console.log("renderizando vista de presentacion (participante)");
    
            const accessCode = document.getElementById("sessionCodeInput").value;
            sessionStorage.setItem("accessCode",accessCode);

            //dispara el evento
            location.hash = `#/active/participant/${accessCode}`;  
            
            await joinSessionHandler();

        }

        //sendAnswer
        if (event.target.matches('#sendAnswer-btn')) {
        
            alert("Enviando respuesta .... falta el endpoint supongo... algo como POST answer(session,user,slideId,answerPicked. El endpoint tb valida si ya mando respuesta ese usuario para esa sesión. Ver como hacer para que si no contesto nada, y el profe pasa la diapo que no pueda volver (puede verificar el currentSlide, si no estas en esa diapo => ya paso la diapo => no te deja. tb podes guardar algo como una lista de (currentSlide,enableBtn) que los deshabilite si se adelantan o retroceden las diapos ");
            
            document.getElementById(listItem1).value
            


            const answerBtn = document.getElementById("sendAnswer-btn");
            answerBtn.classList.add('disabled');

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

            sessionStorage.setItem('access_token', access_token);
            sessionStorage.setItem('expires_in', expires_in);
            sessionStorage.setItem('refresh_token', refresh_token);
            sessionStorage.setItem('role', role);
            sessionStorage.setItem('token_type', token_type);
            sessionStorage.setItem('user_id', user_id);

            // Redirección a /SesionIniciada
            location.hash = '#/presentations';
        } catch (error) {
            alert('Error al loguearse ', error);
        }


        console.log('Login con:', email, password);

    }
});


// UNIRSE A UNA SESIÓN
/*
document.addEventListener('click', async (event) => {
    if (event.target.matches('#join-session-btn')) {
        const codigo = document.getElementById('join-session-access-code').value.trim();
        const token = sessionStorage.getItem('access_token');
        if (codigo.length < 6) {
            alert('Por favor ingresá un código valido');
            return;
        }
        console.log('Uniendose a la session: ', codigo);
        try {
            const session = await getSessionByAccessCode(codigo, token);
            console.log('session found', session);

            //REGISTRO COMO PARTICIPANTE
            const sessionId = session.idSession;
            const userId = sessionStorage.getItem('user_id');

            const participantResponse = await createParticipant(userId, sessionId, token);
            const presentationId = participantResponse.presentationId;

            console.log('Asignando participante: ' + userId + 'a la session: ' + sessionId + ' con id presentación: '+presentationId);

            sessionStorage.setItem('presentation_id', presentationId);
            sessionStorage.setItem('session_id', sessionId);

            const presentation = await getPresentation(presentationId,token);
            sessionStorage.setItem("presentation", JSON.stringify(presentation));


            window.open('#/active/participant', '_blank');

        } catch (error) {
            alert(error);
        }

    }
});

// COMUNICACIÓN CON HUB
*/