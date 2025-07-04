import Navbar from '../../components/navbar_auth.js';

export default async () => {
  return `
    ${Navbar()}
    <main class="slidex-wrapper">

      <!-- HERO ------------------------------------------------------------->
      <section class="slidex-section slidex-gradient-bg slidex-enter-left p-5">
        <div class="slidex-content">
          <h1 class="slidex-title">
            Bienvenido a&nbsp;<span class="slidex-text-gradient">SlideX</span>
          </h1>
        </div>
      </section>

      <!-- FEATURES --------------------------------------------------------->
      <section class="slidex-section slidex-features mt-5">

        <article class="slidex-card slidex-tilt text-center">
          <i class="bi bi-easel-fill feature-icon"></i>
          <h3 class="slidex-card-title">Crea Presentaciones</h3>
          <p class="slidex-card-desc">
            Diseñá tus presentaciones directamente en la plataforma, sin software externo.
          </p>
        </article>

        <article class="slidex-card slidex-tilt text-center">
          <i class="bi bi-broadcast-pin feature-icon"></i>
          <h3 class="slidex-card-title">Transmití en Vivo</h3>
          <p class="slidex-card-desc">
            Mostrá tu presentación en tiempo real a tu audiencia, sin complicaciones.
          </p>
        </article>

        <article class="slidex-card slidex-tilt text-center">
          <i class="bi bi-chat-dots-fill feature-icon"></i>
          <h3 class="slidex-card-title">Interacción en Tiempo Real</h3>
          <p class="slidex-card-desc">
            Permití que tu audiencia participe con encuestas, preguntas y votaciones.
          </p>
        </article>

      </section>

      <!-- CTA FINAL -------------------------------------------------------->
      <section class="slidex-section text-center slidex-fade-in p-5">
        <h2 class="slidex-subtitle mb-4">Creá tu primera presentación</h2>
        <a href="#/presentations/create"
           class="slidex-btn-outline slidex-button-bounce">
          CREAR
        </a>
      </section>

    </main>
  `;
};
