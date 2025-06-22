import Landing from './views/landing.js';
import Login from './views/login.js';
import Presentations from './views/presentations.js'
import JoinSession from './views/joinSessions.js'
import Participant from './views/active/participant.js'
import Presenter from './views//active/presenter.js'

//aca defino las rutas de mi app
const routes = {
  '/': Landing,
  '/login': Login,
  '/presentations': Presentations,
  '/joinSession': JoinSession,
  '/active/participant': Participant,
  '/active/presenter': Presenter
};

const parseLocation = () => location.hash.slice(1).toLowerCase() || '/';

const router = async () => {

  console.log("Iniciando router.js")

  const path = parseLocation();
  var render;

  render = routes[path] || Landing;
  document.getElementById('app').innerHTML = await render();

  console.log("redireccionando a path: " + path)

};

window.addEventListener('hashchange', router);
//window.addEventListener('load', router);

export default router;