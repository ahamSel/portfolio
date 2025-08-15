export function renderContact() {
  const section = document.createElement('section');
  section.className = 'page contact';
  section.innerHTML = `
    <h1>Contact</h1>
    <p><a href="mailto:ahamsel@example.com">ahamsel@example.com</a></p>
    <div class="social">
      <a href="https://github.com/ahamsel" target="_blank"><img src="./images/github.png" alt="GitHub" /></a>
      <a href="https://www.linkedin.com" target="_blank"><img src="./images/linkedin.png" alt="LinkedIn" /></a>
    </div>
  `;
  return section;
}
