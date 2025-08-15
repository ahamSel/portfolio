const projects = [
  { title: 'Auth DB', img: './images/auth_db_poster.jpg' },
  { title: 'Chat App', img: './images/chat_poster.jpg' },
  { title: 'Dot Dodge', img: './images/dotdodge_poster.jpg' },
  { title: 'Fin Insight', img: './images/fin_insight_poster.jpg' },
  { title: 'GWA', img: './images/gwa_poster.jpg' },
  { title: 'World Times', img: './images/worldtimes_poster.jpg' },
];

export function renderProjects() {
  const section = document.createElement('section');
  section.className = 'page projects';
  const title = document.createElement('h1');
  title.textContent = 'Projects';
  const grid = document.createElement('div');
  grid.className = 'projects-grid';

  projects.forEach(p => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.title}" />
      <h3>${p.title}</h3>
    `;
    grid.appendChild(card);
  });

  section.appendChild(title);
  section.appendChild(grid);
  return section;
}
