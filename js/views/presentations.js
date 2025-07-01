import Navbar from '../../components/navbar_auth.js';

export default () => {
  return `${Navbar()}
    <div class="container mt-4">
      <h2>Lista de presentaciones</h2>
      <div class="list-group mt-3">
        <a href="#/presentations/1" class="list-group-item list-group-item-action">
          📊 <strong>Presentación 1:</strong> Estrategias de Marketing 2025
        </a>
        <a href="#/presentations/2" class="list-group-item list-group-item-action">
          📚 <strong>Presentación 2:</strong> Educación y Tecnología
        </a>
        <a href="#/presentations/3" class="list-group-item list-group-item-action">
          💡 <strong>Presentación 3:</strong> Innovación en Energías Renovables
        </a>
      </div>
    </div>
  `;
};
