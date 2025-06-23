import { startSignalRConnection, joinSessionGroup, getSlideActualIndex, onSlideChanged } from '../../SignalR/Manager.js';

export default async () => {
    const sessionId = sessionStorage.getItem('session_id');
    if (!sessionId) {
        window.location.href = '#/error';
        return 'Sesión no encontrada';
    }

    await startSignalRConnection();

    console.log('SessionId :',sessionId);
    
    await joinSessionGroup(sessionId);

    const html = `
        <div class="container mt-4">
            <h2 class="mb-3">Slide Actual</h2>
            <div id="slideActual" class="alert alert-primary fs-4">
                Cargando...
            </div>
        </div>
    `;

    setTimeout(() => {
        const div = document.getElementById('slideActual');
        div.textContent = `Slide actual: ${getSlideActualIndex()}`;

        onSlideChanged((nuevoSlide) => {
            const d = document.getElementById('slideActual');
            if (d) d.textContent = `Slide actual: ${nuevoSlide}`;
        });
    }, 0);

    return html;
};
