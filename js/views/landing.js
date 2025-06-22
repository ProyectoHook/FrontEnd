import Navbar from '../../components/navbar.js';

export default async () => {
  return `
    ${Navbar()}
    <section class="container mt-5">
      <div class="text-center">
        <h1 class="display-4 fw-bold">Bienvenido a <span class="text-primary">SlideX</span></h1>
        <p class="lead mt-3">Tu plataforma para presentaciones en vivo. Conecta, comparte y sorprende a tu audiencia en tiempo real.</p>
        <a href="#/login" class="btn btn-primary btn-lg mt-4">Comenzar ahora</a>
      </div>

      <hr class="my-5" />

      <div class="row text-center">
        <div class="col-md-4">
          <i class="bi bi-easel-fill fs-1 text-primary"></i>
          <h3 class="mt-3">Crea Presentaciones</h3>
          <p>Diseñá tus presentaciones directamente en la plataforma, sin necesidad de software externo.</p>
        </div>
        <div class="col-md-4">
          <i class="bi bi-broadcast-pin fs-1 text-success"></i>
          <h3 class="mt-3">Transmití en Vivo</h3>
          <p>Mostrá tu presentación en tiempo real a tu audiencia, sin complicaciones.</p>
        </div>
        <div class="col-md-4">
          <i class="bi bi-chat-dots-fill fs-1 text-info"></i>
          <h3 class="mt-3">Interacción en Tiempo Real</h3>
          <p>Permití que tu audiencia participe con encuestas, preguntas y votaciones durante tu presentación.</p>
        </div>
      </div>

      <div class="text-center mt-5">
        <a href="#/register" class="btn btn-outline-secondary">¿Aún no tenés cuenta? Registrate</a>
      </div>
    </section>
  `;
};
