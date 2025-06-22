import router from './router.js';
import { getSessionByAccessCode, loginUser } from './api.js'


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

        //click en elemento exacto
        if (event.target.matches("#join-session-btn")) {

        }



        //click en algun hijo dentro de ese elemento
        if (event.target.closest('idDelElemento')) {

            console.log("hace algo");
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
            const session = await getSessionByAccessCode(codigo,token);

            //TE UNO AL HUB --> SESSIONID

            alert('Nice');
        } catch (error) {
            alert(error);
        }

    }
});

// COMUNICACIÓN CON HUB