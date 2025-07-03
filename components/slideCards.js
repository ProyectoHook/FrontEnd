
export function showSlideWaiting() {

    return `
        <div class="card">
            <img src="https://i.pinimg.com/736x/53/0d/a3/530da3e6a7400ad49b5a076feb538b6b.jpg" class="card-img-top" alt="...">
        </div>`;

}

export function pintarSlide(slide, role) {

    console.log('Slide pintado: ', slide);

    if (slide.ask == null) {
        console.log("renderizando card tipo imagen");
        return slideSinPregunta(slide,role);
    }

    console.log("renderizando card tipo question");
    return slideConPregunta(slide,role);
}

export function showSlide(slide, role) {


    switch (slide.idContentType) {

        case (1):
            console.log("renderizando card tipo texto");
            return textSlide(slide);
            break;

        case (2):
            console.log("renderizando card tipo imagen");

            return imgSlide(slide);
            break;

        case (4):
            console.log("renderizando card tipo question");
            return askSlide(slide, role);
            break;

        default:
            console.log("error en renderizado de slide");
            return `<p> Error en renderizacion </p>`
            break;

    }

}


function textSlide(slide) {

    return `

    <div class="card custom-text-card">
        <div class="card-body" style="background-color:${slide.backgroundColor}">
            <h4 class="card-title m-4">${slide.title}</h4>
            <p class="card-text mt-4">${slide.content}</p>
        </div>
    </div>`;

}

function slideConPregunta(slide) {
    return `
      <div class="container">
        <!-- Título arriba, centrado -->
        <h2 class="mb-4 text-center fw-bold">${slide.title ?? 'Sin título'}</h2>
  
        <div class="row align-items-start">
          <!-- Columna imagen -->
          <div class="col-md-6 mb-3">
            <div class="bg-light rounded shadow-sm" style="overflow: hidden; height: 350px;">
              ${
                slide.url
                  ? `<img src="${slide.url}" alt="Slide Image" class="img-fluid w-100 h-100" style="object-fit: cover;">`
                  : `<div class="d-flex justify-content-center align-items-center h-100 text-muted">Sin imagen</div>`
              }
            </div>
          </div>
  
          <!-- Columna pregunta -->
          <div class="col-md-6">
            <div class="card border-primary h-100">
              <div class="card-body d-flex flex-column">
                <h5 class="card-title text-primary">${slide.ask?.name ?? 'Sin pregunta'}</h5>
                <p class="card-text text-muted mb-1">${slide.ask?.description ?? ''}</p>
                <p class="fw-semibold mb-3">${slide.ask?.askText ?? ''}</p>
  
                ${
                  slide.ask?.options?.length > 0
                    ? slide.ask.options
                        .map(
                          (option) => `
                  <div class="form-check mb-2">
                    <input class="form-check-input" type="checkbox" id="option-${option.idOption}" name="option" value="${option.idOption}">
                    <label class="form-check-label" for="option-${option.idOption}">
                      ${option.optionText ?? ''}
                    </label>
                  </div>
                  `
                        )
                        .join('')
                    : '<p class="text-muted">No hay opciones disponibles</p>'
                }
  
                <button type="button" id="btn-save-ask-${slide.idSlide}" class="btn btn-primary mt-auto align-self-start">Guardar respuesta</button>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Info técnica abajo -->
        <ul class="list-group list-group-horizontal mt-4 justify-content-center">
          <li class="list-group-item"><strong>IdSlide:</strong> ${slide.idSlide}</li>
          <li class="list-group-item"><strong>Posición:</strong> ${slide.position}</li>
          <li class="list-group-item"><strong>Creado:</strong> ${slide.createAt ? new Date(slide.createAt).toLocaleString() : 'N/A'}</li>
          <li class="list-group-item"><strong>Modificado:</strong> ${slide.modifiedAt ? new Date(slide.modifiedAt).toLocaleString() : 'N/A'}</li>
          <li class="list-group-item"><strong>IdContentType:</strong> ${slide.idContentType ?? 'N/A'}</li>
          <li class="list-group-item"><strong>IdAsk:</strong> ${slide.ask?.idAsk ?? 'N/A'}</li>
          <li class="list-group-item"><strong>IdPresentation:</strong> ${slide.idPresentation ?? 'N/A'}</li>
        </ul>
      </div>
    `;
  }
  
  
  



function slideSinPregunta(slide) {
    return `
        <div class="card custom-img-card" style="background-color: ${slide.BackgroundColor};">
            ${slide.Url ? `<img src="${slide.Url}" class="card-img-top custom-img-card-img" alt="Slide Image">` : ''}
            <div class="card-body custom-img-card-body">
                <h5 class="card-title">${slide.Title}</h5>
                <p class="card-text">${slide.Content ?? ''}</p>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><strong>IdSlide:</strong> ${slide.IdSlide}</li>
                    <li class="list-group-item"><strong>Position:</strong> ${slide.Position}</li>
                    <li class="list-group-item"><strong>Created At:</strong> ${new Date(slide.CreateAt).toLocaleString()}</li>
                    <li class="list-group-item"><strong>Modified At:</strong> ${slide.ModifiedAt ? new Date(slide.ModifiedAt).toLocaleString() : 'N/A'}</li>
                    <li class="list-group-item"><strong>IdContentType:</strong> ${slide.IdContentType}</li>
                    <li class="list-group-item"><strong>IdAsk:</strong> ${slide.IdAsk ?? 'N/A'}</li>
                    <li class="list-group-item"><strong>IdPresentation:</strong> ${slide.IdPresentation}</li>
                </ul>
            </div>
        </div>
    `;
}



function imgSlide(slide) {

    if (slide.content == null) {
        return `<img src=${slide.url} class="custom-img-card-img-onlyImg" alt="...">`;
    }
    else {
        return `
            <div class="card custom-img-card">
                <img src="${slide.url}" class="card-img-top custom-img-card-img" alt="...">
                <div class="card-body custom-img-card-body">
                    <p class="card-text">${slide.content}</p>
                </div>
            </div>`;
    }
}


function askSlide(slide, role) {

    var btn_disabled = ''
    var btn_type = "btn-primary"

    if (role == "presentador") {
        btn_disabled = "disabled"
        btn_type = "btn-secondary"
    }

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
            <div class="d-flex justify-content-center m-2">
                <button id="sendAnswer-btn" class="btn ${btn_type} w-25" ${btn_disabled}>Enviar respuesta</button>
            </div>
        </ul>
    </div>`;

}
