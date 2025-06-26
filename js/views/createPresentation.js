import Navbar from '../../components/navbar_auth.js';
import { createPresentation } from '../../js/api.js';

export default () => {
  return `${Navbar()}
    <div class="container mt-4">
      <h2>Crear Presentación</h2>
      <form id="formCreatePresentation">
        <div class="mb-3">
          <label class="form-label">Título</label>
          <input type="text" id="titlePresentation" class="form-control" required />
        </div>
        <button type="submit" class="btn btn-primary">Crear</button>
      </form>
    </div>
  `;
};

document.addEventListener("submit", async (e) => {
  if (e.target && e.target.id === "formCreatePresentation") {
    e.preventDefault();

    const title = document.getElementById("titlePresentation").value;
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    try {
      const presentation = await createPresentation({ title, idUserCreat: userId }, token);
      alert("Presentación creada con éxito");
      localStorage.setItem("presentationId", presentation.idPresentation);
      location.hash = "#/presentations/add-slide";
    } catch (error) {
      alert("Error al crear la presentación");
    }
  }
});
