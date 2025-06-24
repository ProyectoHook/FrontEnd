export async function joinSession(sessionCode) {

            const url = 'https://localhost:6662/session/join/private/' + sessionCode;

            const jwt = 'Bearer ' + localStorage.getItem("access_token");
            console.log(jwt);

            try {
                const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': jwt,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify()
                });

                if (!response.ok) {
                    // Puedes lanzar error con más detalle si la API devuelve mensajes
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Error en la solicitud');
                }

                const data = await response.json();
                //console.log('Respuesta del servidor:', data);

                return data;

            } catch (error) {
                console.error('Error al iniciar sesión:', error.message);
            }
        }

export async function joinSessionHandler() {

             console.log("Iniciando inicio de sesion...");

            const sessionCode = document.getElementById('sessionCodeInput').value;

            const json = await joinSession(sessionCode);

            // --- REVISAR ---

            console.log("datos de respuesta de la conexion");
            console.log(json);

            var sortedSlides = json.presentation.slides;
            //orden por posicion ascendente
            sortedSlides.sort((a, b) => a.position - b.position);
            localStorage.setItem("slides",JSON.stringify(sortedSlides));

            console.log("slides")
            console.log(json.presentation.slides)
            console.log("sorted slides")
            console.log(sortedSlides)

            //muestro la diapositiva actual
            const screen = document.getElementById('imgSlideScreen');
            screen.src = sortedSlides[json.currentSlide-1].content;

            // ---------------

            let sessionStatus = document.getElementById('sessionStatusSpan');

            sessionStatus.textContent = "Joined in";
            sessionStatus.classList.remove("text-danger");
            sessionStatus.classList.add("text-success");

            console.log("Inicio de sesion exitoso.");

            const connection = new signalR.HubConnectionBuilder()
                .withUrl('https://localhost:6662/presentationHub')
                .configureLogging(signalR.LogLevel.Information)
                .build();


            //defino lo que sucede cuando reciba mensaje
            connection.on("ReceiveSlide", (slideIndex) => {
                console.log("MENSAJE RECIBIDO");
                let sortedSlides = JSON.parse(localStorage.getItem("slides"));                
                const screen = document.getElementById('imgSlideScreen');
                screen.src = sortedSlides[slideIndex-1].content;

            });

            //inicio la conexion
            connection.start()
                .then(function () {
                console.log("Conexión iniciada");
        // Aquí puedes enviar mensajes con connection.invoke(...) si quieres
                }).catch(function (err) {
                    return console.error(err.toString());
                    });
        }

   

        //creo variable para conectarme
           

            //cuando quieras implementar jwt
            // .withUrl("https://tuservicio.com/presentationHub", {
            //        accessTokenFactory: () => jwtToken
            // })
            //en el metodo del hub va el [Authorize]
            //[Authorize]
            //public class PresentationHub : Hub

        /*
        function sendAsk() {
            const slide = document.getElementById("slideInput").value;
            connection.invoke("SendSlide", slide).catch(err => console.error(err.toString()));
        }
        */