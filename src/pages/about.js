export function renderAbout() {
  const section = document.createElement('section');
  section.className = 'page about';
  section.innerHTML = `
    <h1>Hi, I'm Ahmed <span class="wave">👋🏼</span></h1>
    <p>
      I'm an undergraduate Computer Science student at MUN based in St. John's, Canada.
      I love solving problems and building apps and games.
    </p>
  `;
  return section;
}
