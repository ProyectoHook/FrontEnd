export default () => {
    return `
  <nav class="navbar navbar-expand-lg custom-navbar-2">
    <div class="container-fluid">
      <a class="navbar-brand" href="#/">SlideX</a>
  
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" 
              aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
  
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">

          <li class="nav-item">
            <a class="nav-link" href="#/joinsession">Home</a>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="#/joinsession">Unirse a una sesión</a>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="#/joinsession">Mis sesiones activas</a>
          </li>

           <li class="nav-item">
            <a class="nav-link" href="#/presentations/create">Crear una presentación</a>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="#/presentations">Mis presentaciones</a>
          </li>
   
        </ul>
  
        <ul class="navbar-nav ms-auto">
          <li class="nav-item auth">
            <a class="nav-link" href="#/account">Mi cuenta</a>
          </li>
          <li class="nav-item auth">
            <a class="nav-link" href="#/landing">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
    `;
  };
  