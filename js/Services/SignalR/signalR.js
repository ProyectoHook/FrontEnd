
import { SIGNALR_HUB } from "../../../data/config.js";
import { startSession } from "../SessionServices/startSession.js";
import { showSlide } from "../../../components/slideCards.js";

//creo variable para conectarme
export const connection = new signalR.HubConnectionBuilder()
        .withUrl(SIGNALR_HUB)
        .configureLogging(signalR.LogLevel.Information)
        .build();


async function iniciarSignalR(){

    console.log("funcion iniciarSignalR")
       

    //defino lo que sucede cuando reciba mensaje
    connection.on("ReceiveSlide", (slideIndex) => {
        
        console.log("MENSAJE RECIBIDO - PRESENTADOR");
        let sortedSlides = JSON.parse(localStorage.getItem("slides"));                
        const slideContainer = document.getElementById('slideCardContainer');   
        slideContainer.innerHTML = showSlide(sortedSlides[slideIndex-1],"presentador");
    });


    //Conectamos
    await connection.start();
    
    console.log("Conectado como presentador");

    //agrego al grupo


    await connection.invoke("JoinSession", localStorage.getItem("sessionId"));
        
    console.log("Realizando invoke para carga de primer slide...")

    localStorage.setItem('currentSlide',1);
    let sortedSlides = JSON.parse(localStorage.getItem("slides"));   
    await changeSlide(connection,localStorage.getItem("sessionId"),1,sortedSlides[0]);

}



async function changeSlide(connection,sessionId,slideIndex,slide){
    
    console.log("slideIndex: ",slideIndex);
    console.log("sessionId: ",sessionId);

    const slideRequest = {
        sessionId : sessionId,
        slideIndex: slideIndex,
        slideId : slide.slideId,
        ask : null, 
        answerCorrect : null,
        options : null
    }

    console.log("slideRequest: ", slideRequest);

    //await connection.invoke("ChangeSlide", sessionId, slideIndex);
   await connection.invoke("ChangeSlide", sessionId, slideRequest);
}

     

async function startSessionHandler() {

    console.log("Creando sesión (startSessionHandler)...");

    const description = document.getElementById('descriptionInput').value;
    const max_participants = document.getElementById('maxParticipantsInput').value;
    const presentationId = document.getElementById('presentationIdInput').value;

    //Hace el POST para crear sesión y se trae la presentacion asociada y sus slides
    const json = await startSession(description,max_participants,presentationId);

    console.log("datos de la conexion");
    console.log(json);

    console.log("sessionId: ",json.sessionId);
    console.log("accessCode: ",json.acces_code);

    localStorage.setItem("sessionId",json.sessionId);
    sessionStorage.setItem("accessCode",json.acces_code);

    console.log("sessionId guardado en local (fijate donde conviene)?")
    console.log("sessionId: ",localStorage.getItem("sessionId"));

    var sortedSlides = json.presentation.slides;
    //orden por posicion ascendente
    sortedSlides.sort((a, b) => a.position - b.position);
    localStorage.setItem("slides",JSON.stringify(sortedSlides));

    console.log("slides")
    console.log(json.presentation.slides)
    console.log("sorted slides")
    console.log(sortedSlides)

    console.log("Sesión creada exitosamente");

}

export { startSessionHandler, iniciarSignalR };