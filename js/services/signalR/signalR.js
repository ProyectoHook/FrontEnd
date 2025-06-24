

async function iniciarSignalR(){

            const btnFirst = document.getElementById("btn_first");
            const btnPrev = document.getElementById("btn_prev");
            const btnGoto = document.getElementById("btn_goto");
            const btnNext = document.getElementById("btn_next");
            const btnLast = document.getElementById("btn_last");

            btnFirst.addEventListener("click", () => {
                changeSlide(connection,localStorage.getItem("sessionId"),1)
                localStorage.setItem('currentSlide',1);
                console.log("btn First");
            });

            btnPrev.addEventListener("click", () => {
                let currentIndex = localStorage.getItem('currentSlide');
                let slides = JSON.parse(localStorage.getItem("slides"));  
                if( currentIndex > 1 )
                {
                    changeSlide(connection,localStorage.getItem("sessionId"),currentIndex-1)
                    localStorage.setItem('currentSlide',Number(currentIndex)-1);
                }
                console.log("btn Previous");
            });

            btnGoto.addEventListener("click", () => {
                let slides = JSON.parse(localStorage.getItem("slides"));  
                let slide = document.getElementById("goToInput").value;
                if(slide >= 1 && slide <= slides.length )
                {
                    changeSlide(connection,localStorage.getItem("sessionId"),Number(slide))
                    localStorage.setItem('currentSlide',slide);
                    console.log('btn goTo --> slide:'+ slide);
                }
                else
                {
                    alert('btn goTo : error --> indice no valido');
                }
            });

            btnNext.addEventListener("click", () => {
                let currentIndex = localStorage.getItem('currentSlide');
                let slides = JSON.parse(localStorage.getItem("slides"));     
                if( currentIndex < slides.length )
                {
                    changeSlide(connection,localStorage.getItem("sessionId"),Number(currentIndex)+1)
                    localStorage.setItem('currentSlide',Number(currentIndex)+1);
                }
                console.log("btn Next");
            });

            btnLast.addEventListener("click", () => {
                let slides = JSON.parse(localStorage.getItem("slides"));
                changeSlide(connection,localStorage.getItem("sessionId"),slides.length)
                localStorage.setItem('currentSlide',slides.length);
                console.log("btn Last");
            });


            //creo variable para conectarme
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

            //Conectamos
            await connection.start().then(() => {
                console.log("Conectado como presentador");
                btnFirst.disabled = false;
                btnFirst.classList.remove("btn-disabled");
                btnFirst.classList.add("btn-primary");
                btnPrev.disabled = false;
                btnPrev.classList.remove("btn-disabled");
                btnPrev.classList.add("btn-primary");
                btnGoto.disabled = false;
                btnGoto.classList.remove("btn-disabled");
                btnGoto.classList.add("btn-primary");
                document.getElementById("goToInput").disabled = false;
                btnNext.disabled = false;
                btnNext.classList.remove("btn-disabled");
                btnNext.classList.add("btn-primary");
                btnLast.disabled = false;
                btnLast.classList.remove("btn-disabled");
                btnLast.classList.add("btn-primary");

                //Nota: puedo hacer 2 cosas
                // 1. Cargar la imagen local
                // 2. Ejecutar invoke (cambia tb para mi) 
                
                localStorage.setItem('currentSlide',1);

                return changeSlide(connection,localStorage.getItem("sessionId"),1);

            });

}

 async function changeSlide(connection, sessionId,slideIndex){
            //envio msj al hub para modificar slide
            await connection.invoke("ChangeSlide", sessionId, slideIndex);
        }

      


        async function startSessionHandler() {

            console.log("Creando sesión...");

            const description = document.getElementById('descriptionInput').value;
            const max_participants = document.getElementById('maxParticipantsInput').value;
            const presentationId = document.getElementById('presentationIdInput').value;

            const json = await startSession(description,max_participants,presentationId);

            console.log("datos de la conexion");
            console.log(json);

            localStorage.setItem("sessionId",json.idSession);

            var sortedSlides = json.presentation.slides;
            //orden por posicion ascendente
            sortedSlides.sort((a, b) => a.position - b.position);
            localStorage.setItem("slides",JSON.stringify(sortedSlides));

            console.log("slides")
            console.log(json.presentation.slides)
            console.log("sorted slides")
            console.log(sortedSlides)
           
            let sessionStatus = document.getElementById('sessionStatusSpan');
            let sessionCode = document.getElementById('sessionCodeSpan');

            sessionCode.textContent = json.access_code;
            sessionCode.classList.remove("text-danger");
            sessionCode.classList.add("text-success");

            sessionStatus.textContent = "Online";
            sessionStatus.classList.remove("text-danger");
            sessionStatus.classList.add("text-success");

            await iniciarSignalR();

            console.log("Sesión creada exitosamente.");

        }