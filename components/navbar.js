export default () => {
  return `
<nav class="navbar navbar-expand-lg custom-navbar">
  <div class="container-fluid">
    <a class="navbar-brand" href="#/">SlideX</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" 
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="#/about">Sobre Nosotros</a>
        </li>
      </ul>

      <ul class="navbar-nav ms-auto">
        <li class="nav-item auth">
          <a class="nav-link" href="#/login">Login</a>
        </li>
        <li class="nav-item auth">
          <a class="nav-link" href="#/register">Sign up</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
  `;
};
