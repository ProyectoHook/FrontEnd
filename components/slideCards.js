import { connection } from '../js/Services/SessionServices/joinSession.js';

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
        switch (role) {
            case 1:
                return slideSinPreguntaPresentador(slide);
            case 2:
                return slideSinPreguntaParticipante(slide);
            default:
                alert('ERROR');
        }
    }

    console.log("renderizando card tipo question");

    switch (role) {
        case 1:
            return slideConPreguntaPresentador(slide);
        case 2:
            return slideConPreguntaParticipante(slide);
        default:
            alert('ERROR');
    }
}

function slideConPreguntaPresentador(slide) {
    return `
      <div class="presenter-wrapper">
        <h4 class="text-center text-primary fw-bold mb-4">${slide.title ?? "Sin título"}</h4>
        <h6 class="text-center text-primary fw-bold mb-4">${slide.content ?? 'Sin subtitulo'}</h6>
  
        <div class="presenter-content">
          <div class="presenter-image" style="background-color: ${slide.backgroundColor ?? '#fff'};">
            ${slide.url
            ? `<img src="${slide.url}" alt="Slide Image" class="presenter-image-img">`
            : `<div class="text-muted text-center">Sin imagen</div>`
        }
          </div>
        
          <div class="presenter-question">
            <h6 class="presenter-question-title">${slide.ask?.name ?? "Sin pregunta"}</h6>
            <p class="presenter-question-description">${slide.ask?.description ?? ""}</p>
            <p class="presenter-question-text">${slide.ask?.askText ?? ""}</p>
  
            ${slide.ask?.options?.length
            ? slide.ask.options.map(o => `
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="option-${o.idOption}" disabled>
                  <label class="form-check-label" for="option-${o.idOption}">
                    ${o.optionText ?? ""}
                  </label>
                </div>`).join("")
            : `<p class="text-muted">No hay opciones disponibles</p>`
        }
            <div id="stats-presenter" class="alert alert-info mt-3" style="display:none;"></div>
          </div>
        </div>
  
        <ul class="list-group list-group-horizontal-md mt-4 flex-wrap justify-content-center small">
          <li class="list-group-item"><strong>IdSlide:</strong> ${slide.idSlide}</li>
          <li class="list-group-item"><strong>Posición:</strong> ${slide.position}</li>
          <li class="list-group-item"><strong>Creado:</strong> ${slide.createAt ? new Date(slide.createAt).toLocaleString() : "N/A"}</li>
          <li class="list-group-item"><strong>Modificado:</strong> ${slide.modifiedAt ? new Date(slide.modifiedAt).toLocaleString() : "N/A"}</li>
          <li class="list-group-item"><strong>IdContentType:</strong> ${slide.idContentType ?? "N/A"}</li>
          <li class="list-group-item"><strong>IdAsk:</strong> ${slide.ask?.idAsk ?? "N/A"}</li>
          <li class="list-group-item"><strong>IdPresentation:</strong> ${slide.idPresentation ?? "N/A"}</li>
        </ul>
      </div>
    `;
}

function slideConPreguntaParticipante(slide) {
    return `
      <div class="participant-wrapper">
        <div class="participant-slide">
          <div class="card shadow-sm h-100">
            <div class="card-header text-center">
              <h5 class="card-title mb-0 text-primary">${slide.title ?? 'Sin título'}</h5>
              <h6 class="text-center text-primary fw-bold mb-4">${slide.content ?? 'Sin subtitulo'}</h6>
            </div>
            <div class="card-body participant-image" style="background-color: ${slide.backgroundColor ?? '#fff'};">
              ${slide.url
            ? `<img src="${slide.url}" alt="Slide Image" class="participant-image-img">`
            : `<div class="text-muted text-center w-100">Sin imagen</div>`
        }
            </div>
          </div>
        </div>
  
        <div class="participant-question">
          <div>
            <h6 class="fw-bold text-primary">${slide.ask?.name ?? 'Sin pregunta'}</h6>
            <p class="text-muted mb-1">${slide.ask?.description ?? ''}</p>
            <p class="fw-semibold">${slide.ask?.askText ?? ''}</p>
  
            ${slide.ask?.options?.length
            ? slide.ask.options.map(o => `
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="option-${o.idOption}" value="${o.idOption}">
                    <label class="form-check-label" for="option-${o.idOption}">
                      ${o.optionText ?? ''}
                    </label>
                  </div>`).join('')
            : `<p class="text-muted">No hay opciones disponibles</p>`
        }
          </div>
  
          <div class="text-end mt-3">
            <button id="btn-save-ask-${slide.idSlide}" class="btn btn-sm btn-primary" onclick="submitAnswer">Guardar respuesta</button>
          </div>
        </div>
      </div>
    `;
}

function slideSinPreguntaPresentador(slide) {
    return `
      <div class="presenter-wrapper">
        <h4 class="text-center text-primary fw-bold mb-4">${slide.title ?? 'Sin título'}</h4>
        <h6 class="text-center text-primary fw-bold mb-4">${slide.content ?? 'Sin subtitulo'}</h6>
  
        <div class="presenter-content">
          <div class="presenter-image" style="background-color: ${slide.backgroundColor ?? '#fff'};">
            ${slide.url
            ? `<img src="${slide.url}" alt="Slide Image" class="presenter-image-img">`
            : `<div class="text-muted text-center">Sin imagen</div>`
        }
          </div>
        </div>
  
        <ul class="list-group list-group-horizontal-md mt-4 flex-wrap justify-content-center small">
          <li class="list-group-item"><strong>Posición:</strong> ${slide.position}</li>
          <li class="list-group-item"><strong>Creado:</strong> ${slide.createAt ? new Date(slide.createAt).toLocaleString() : 'N/A'
        }</li>
          <li class="list-group-item"><strong>Modificado:</strong> ${slide.modifiedAt ? new Date(slide.modifiedAt).toLocaleString() : 'N/A'
        }</li>
        </ul>
      </div>
    `;
}

function slideSinPreguntaParticipante(slide) {
    return `
      <div class="participant-wrapper">
        <div class="participant-slide">
          <div class="card shadow-sm h-100">
            <div class="card-header text-center">
              <h5 class="card-title mb-0 text-primary">${slide.title ?? 'Sin título'}</h5>
              <h6 class="text-center text-primary fw-bold mb-4">${slide.content ?? 'Sin Subtitulo'}</h6>
            </div>
  
            <div class="card-body participant-image" style="background-color: ${slide.backgroundColor ?? '#fff'
        };">
              ${slide.url
            ? `<img src="${slide.url}" alt="Slide Image" class="participant-image-img">`
            : `<div class="text-muted text-center w-100">Sin imagen</div>`
        }
            </div>
          </div>
        </div>
      </div>
    `;
}

// Evento delegado para todos los botones "Guardar respuesta"
document.addEventListener('click', function(event) {
    if (event.target && event.target.matches('button[id^="btn-save-ask-"]')) {
        const button = event.target;
        const slideId = button.id.replace('btn-save-ask-', '');
        const parent = button.closest('.participant-question');
        let selectedOption = null;
        if (parent) {
            // Busca primero un radio seleccionado
            const radio = parent.querySelector('input.form-check-input[type="radio"]:checked');
            if (radio) {
                // Buscar el label asociado y tomar el texto
                const label = parent.querySelector('label[for="' + radio.id + '"]');
                selectedOption = label ? label.textContent.trim() : null;
            } else {
                // Si no hay radios, busca un checkbox seleccionado (solo el primero)
                const checkbox = parent.querySelector('input.form-check-input[type="checkbox"]:checked');
                if (checkbox) {
                    const label = parent.querySelector('label[for="' + checkbox.id + '"]');
                    selectedOption = label ? label.textContent.trim() : null;
                }
            }
        }
        submitAnswer(slideId, selectedOption);
    }
});

// Modificar submitAnswer para recibir los datos
async function submitAnswer(slideId, selectedOption) {
    if (!selectedOption) {
        alert('Por favor, selecciona una respuesta antes de guardar.');
        return;
    }
    const sessionId = localStorage.getItem('sessionId');
    const userId = localStorage.getItem('user_id');
    const answer = selectedOption;
    console.log(userId);
    console.log(sessionId);
    const answerRequest = {
        sessionId: sessionId.slice(1, -1),
        slideId: Number(slideId),
        userId: userId,
        answer: answer
    };

    console.log('Enviando respuesta:', answerRequest);
    if (connection.state !== "Connected") {
    alert("La conexión con el servidor no está activa. Intenta recargar la página.");
    return;
}
    var stats = await connection.invoke('submitAnswer',sessionId.slice(1, -1),answerRequest)
    console.log('Estadistica recibida, stats:', stats);
    

}