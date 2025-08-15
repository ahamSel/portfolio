import NavBar from './components/NavBar.js';
import { renderAbout } from './pages/about.js';
import { renderProjects } from './pages/projects.js';
import { renderContact } from './pages/contact.js';

const routes = {
  '': renderAbout,
  '#about': renderAbout,
  '#projects': renderProjects,
  '#contact': renderContact,
};

function render() {
  const { hash } = window.location;
  const page = routes[hash] || renderAbout;
  const app = document.getElementById('app');
  app.innerHTML = '';
  app.appendChild(NavBar());
  app.appendChild(page());
}

window.addEventListener('hashchange', render);
render();
