
export function showSlideWaiting(){

    return `
        <div class="card">
            <img src="https://i.pinimg.com/736x/53/0d/a3/530da3e6a7400ad49b5a076feb538b6b.jpg" class="card-img-top" alt="...">
        </div>`;

}

export function showSlide(slide,role) {

    console.log("renderizando slide");
    console.log("esta llegando undefined");
    console.log(slide)


    switch(slide.idContentType){

        case(1):
            console.log("renderizando card tipo texto");
            return textSlide(slide);
        break;

        case(2):
            console.log("renderizando card tipo imagen");

            return imgSlide(slide);
        break;

        case(4):
            console.log("renderizando card tipo question");
            return askSlide(slide);
        break;

        default:
            console.log("error en renderizado de slide");
            return `<p> Error en renderizacion </p>`
        break;

    }

}


function textSlide(slide){

    return `

    <div class="card custom-text-card">
        <div class="card-body" style="background-color:${slide.backgroundColor}">
            <h4 class="card-title m-4">${slide.title}</h4>
            <p class="card-text mt-4">${slide.content}</p>
        </div>
    </div>`;

}


function imgSlide(slide){

    if(slide.content == null)
    {
        return `<img src=${slide.url} class="custom-img-card-img-onlyImg" alt="...">`;
    }
    else
    {
        return `
            <div class="card custom-img-card">
                <img src="${slide.url}" class="card-img-top custom-img-card-img" alt="...">
                <div class="card-body custom-img-card-body">
                    <p class="card-text">${slide.content}</p>
                </div>
            </div>`;
    }
}


function askSlide(slide){

    var option1 = slide.ask.options[0].optionText;
    var option2 = slide.ask.options[1].optionText;
    var option3 = slide.ask.options[2].optionText;

    return `

    <div class="card custom-ask-card">
        <div class="card-body custom-ask-card-question mx-auto">
            <p class="card-text">${slide.ask.askText}</p>
        </div>
        <ul class="list-group list-group-flush custom-ask-card-options">          

            <li class="list-group-item">
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                    <label class="form-check-label" for="flexRadioDefault1">
                        ${option1}
                    </label>
                </div>
            </li>
            <li class="list-group-item">
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
                    <label class="form-check-label" for="flexRadioDefault2">
                        ${option2}
                    </label>
                </div>
            </li>
            <li class="list-group-item">
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
                    <label class="form-check-label" for="flexRadioDefault2">
                        ${option3}
                    </label>
                </div>
            </li>
            <div class="justify-content-center">
                <button id="sendAnswer-btn" class="btn btn-primary w-25">Enviar respuesta</button>
            </div>
        </ul>
    </div>`;

}
