import Navbar from "../../components/navbar_auth.js";

// Aquí ponemos el HTML de la vista como template string
const template = `
${Navbar()}
<div class="container-fluid p-4">
  <div class="row g-3">
    <div class="col-md-2 bg-info text-white rounded p-3">
      <label>Título</label>
      <input id="input-title" type="text" class="form-control mb-2" />
      <label>Subtítulo</label>
      <input id="input-subtitle" type="text" class="form-control mb-2" />
      <label>URL Imagen</label>
      <input id="input-img" type="text" class="form-control mb-2" />
      <label>Color de fondo</label>
      <input id="input-bg" type="color" class="form-control form-control-color" />
    </div>

    <div class="col-md-7">
      <div id="preview" class="preview-box">
        <h3 id="preview-title">Título</h3>
        <p id="preview-subtitle">Subtítulo</p>
        <div
          id="preview-img"
          class="bg-dark mt-3 mx-auto"
          style="width: 60%; height: 200px; border-radius: 10px; line-height: 200px;"
        >
          IMG
        </div>
      </div>
    </div>

    <div class="col-md-3 bg-info text-white rounded p-3">
      <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" id="toggleQuestion" />
        <label class="form-check-label" for="toggleQuestion">Agregar pregunta</label>
      </div>
      <div id="questionSection" class="mt-3" style="display: none;">
        <label>Pregunta</label>
        <input id="input-question" type="text" class="form-control mb-2" />
        <div id="options-container"></div>
        <button class="btn btn-light w-100" id="btn-add-option">+</button>
      </div>
    </div>
  </div>

  <div class="mt-4 rounded p-3 d-flex align-items-center" id="slides-container"></div>
</div>
`;

export default async function createPresentation() {
  // Retornamos el HTML para renderizar en el div#app
  // Después de renderizar, se debe inicializar la lógica para los inputs y botones
  setTimeout(() => {
    initSlideCreator();
  }, 0);
  return template;
}

// Estado interno
const slides = [];
let currentSlideIndex = -1;

function initSlideCreator() {
  // Cargar elementos
  const inputTitle = document.getElementById('input-title');
  const inputSubtitle = document.getElementById('input-subtitle');
  const inputImg = document.getElementById('input-img');
  const inputBg = document.getElementById('input-bg');
  const toggleQuestion = document.getElementById('toggleQuestion');
  const questionSection = document.getElementById('questionSection');
  const inputQuestion = document.getElementById('input-question');
  const optionsContainer = document.getElementById('options-container');
  const slidesContainer = document.getElementById('slides-container');
  const btnAddOption = document.getElementById('btn-add-option');

  // FUNCIONES

  function updatePreview() {
    if (currentSlideIndex === -1) return;
    const slide = slides[currentSlideIndex];

    document.getElementById('preview-title').innerText = slide.title;
    document.getElementById('preview-subtitle').innerText = slide.subtitle;

    const imgDiv = document.getElementById('preview-img');
    imgDiv.innerText = '';
    imgDiv.style.backgroundImage = slide.imgUrl ? `url(${slide.imgUrl})` : '';
    imgDiv.style.backgroundSize = 'cover';
    imgDiv.style.backgroundPosition = 'center';

    document.getElementById('preview').style.backgroundColor = slide.bgColor;

    // Inputs
    inputTitle.value = slide.title;
    inputSubtitle.value = slide.subtitle;
    inputImg.value = slide.imgUrl;
    inputBg.value = slide.bgColor;

    toggleQuestion.checked = slide.showQuestion;
    questionSection.style.display = slide.showQuestion ? 'block' : 'none';

    inputQuestion.value = slide.question;

    // Opciones
    optionsContainer.innerHTML = '';
    slide.options.forEach((opt, i) => {
      const optionDiv = document.createElement('div');
      optionDiv.className = 'option-box d-flex align-items-center justify-content-between';
      optionDiv.innerHTML = `
        <input type="text" class="form-control me-2" value="${opt.text}" data-index="${i}" />
        <input type="checkbox" ${opt.correct ? 'checked' : ''} data-index="${i}" />
        <button class="btn btn-sm btn-danger ms-2" data-index="${i}">🗑️</button>
      `;
      optionsContainer.appendChild(optionDiv);
    });
  }

  function updateSlideData() {
    if (currentSlideIndex === -1) return;
    const slide = slides[currentSlideIndex];
    slide.title = inputTitle.value;
    slide.subtitle = inputSubtitle.value;
    slide.imgUrl = inputImg.value;
    slide.bgColor = inputBg.value;
    slide.question = inputQuestion.value;
    updatePreview();
  }

  function addSlide() {
    slides.push({
      title: 'Título',
      subtitle: 'Subtítulo',
      imgUrl: '',
      bgColor: '#aaaaaa',
      question: '',
      options: [],
      showQuestion: false,
    });
    currentSlideIndex = slides.length - 1;
    renderSlides();
    updatePreview();
  }

  function moveSlide(fromIndex, toIndex) {
    if (toIndex < 0 || toIndex >= slides.length) return;
    const [moved] = slides.splice(fromIndex, 1);
    slides.splice(toIndex, 0, moved);
    currentSlideIndex = toIndex;
    renderSlides();
    updatePreview();
  }

  function renderSlides() {
    slidesContainer.innerHTML = '';

    slides.forEach((_, i) => {
      const div = document.createElement('div');
      div.className = 'slide-thumb' + (i === currentSlideIndex ? ' active-slide' : '');
      div.innerText = i + 1;
      div.onclick = () => {
        currentSlideIndex = i;
        renderSlides();
        updatePreview();
      };

      // Botones mover
      const btnLeft = document.createElement('button');
      btnLeft.className = 'move-btn move-left';
      btnLeft.innerHTML = '&larr;';
      btnLeft.onclick = (e) => {
        e.stopPropagation();
        moveSlide(i, i - 1);
      };

      const btnRight = document.createElement('button');
      btnRight.className = 'move-btn move-right';
      btnRight.innerHTML = '&rarr;';
      btnRight.onclick = (e) => {
        e.stopPropagation();
        moveSlide(i, i + 1);
      };

      div.appendChild(btnLeft);
      div.appendChild(btnRight);
      slidesContainer.appendChild(div);
    });

    // Botón agregar slide
    const addBtn = document.createElement('button');
    addBtn.className = 'btn btn-light ms-3';
    addBtn.innerText = '+';
    addBtn.onclick = addSlide;
    slidesContainer.appendChild(addBtn);

    // Botón guardar slides
    const saveBtn = document.createElement('button');
    saveBtn.className = 'btn btn-success ms-3';
    saveBtn.innerText = 'Guardar';
    saveBtn.onclick = () => {
      console.log(slides);
      alert('Guardando slides...');
    };
    slidesContainer.appendChild(saveBtn);
  }

  function addOption() {
    if (currentSlideIndex === -1) return;
    slides[currentSlideIndex].options.push({ text: '', correct: false });
    updatePreview();
  }

  // Eventos para inputs
  inputTitle.addEventListener('input', updateSlideData);
  inputSubtitle.addEventListener('input', updateSlideData);
  inputImg.addEventListener('input', updateSlideData);
  inputBg.addEventListener('input', updateSlideData);
  inputQuestion.addEventListener('input', updateSlideData);

  toggleQuestion.addEventListener('change', () => {
    if (currentSlideIndex === -1) return;
    slides[currentSlideIndex].showQuestion = toggleQuestion.checked;
    if (toggleQuestion.checked && slides[currentSlideIndex].options.length === 0) {
      slides[currentSlideIndex].options.push({ text: '', correct: false });
    }
    updatePreview();
  });

  btnAddOption.addEventListener('click', (e) => {
    e.preventDefault();
    addOption();
  });

  // Delegación para inputs de opciones y botones borrar dentro de optionsContainer
  optionsContainer.addEventListener('input', (e) => {
    const target = e.target;
    if (target.tagName === 'INPUT' && target.type === 'text') {
      const i = Number(target.dataset.index);
      slides[currentSlideIndex].options[i].text = target.value;
    }
  });

  optionsContainer.addEventListener('change', (e) => {
    const target = e.target;
    if (target.tagName === 'INPUT' && target.type === 'checkbox') {
      const i = Number(target.dataset.index);
      slides[currentSlideIndex].options[i].correct = target.checked;
    }
  });

  optionsContainer.addEventListener('click', (e) => {
    const target = e.target;
    if (target.tagName === 'BUTTON') {
      const i = Number(target.dataset.index);
      slides[currentSlideIndex].options.splice(i, 1);
      updatePreview();
    }
  });

  // Inicializamos con una slide
  addSlide();
}
