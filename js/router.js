import Landing from './views/landing.js';
import Login from './views/user/login.js';
import Register from './views/user/register.js';
import Presentations from './views/presentations.js';
import JoinSession from './views/joinSessions.js';
//luego cambiar viewer por participant
import Participant from './views/active/viewer.js';
import Presenter from './views/active/presenter.js';
import Account from './views/account.js';
import About from './views/about.js';
import postRenderPresenter from '../src/postRenderHandlers/postRenderPresenter.js';

//aca defino las rutas de mi app
const routes = {
  '/': Landing,
  '/login': Login,
  '/register' : Register,
  '/about' : About,
  '/presentations': Presentations,
  '/joinsession': JoinSession,
  '/account' : Account
};

const parseLocation = () => location.hash.slice(1).toLowerCase() || '/';

const router = async () => {

  console.log("Iniciando router.js")

  const path = parseLocation();
  var render;

  if(path.startsWith('/active/') && !routes[path])
  {
    const access_condition = path.split('/')[2];
    const access_code = path.split('/')[3];

    console.log(`path: ${path}`)
    console.log(`access_contidion: ${access_condition}`)
    console.log(`access_code: ${access_code}`)
    
    render = path

    console.log(`Conectando como ${access_condition}`);

    if(access_condition == "presenter")
    {
      console.log("entra a Presenter")
      document.getElementById('app').innerHTML = await Presenter();
      await postRenderPresenter();
    }
    else if(access_condition == "participant")
         {
           console.log("entra a participant")
           document.getElementById('app').innerHTML = await Participant(access_code);
         }  
  }
  else
  {

    //toma una ruta preestablecida o Landing

    render = routes[path] || Landing;
    document.getElementById('app').innerHTML = await render();
    console.log("redireccionando a path: " + path)

  };

  window.addEventListener('hashchange', router);
  //window.addEventListener('load', router);

}

export default router;