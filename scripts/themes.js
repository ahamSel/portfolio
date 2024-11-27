const themes = {
    nightOwl: {
        background: '#011627',
        backgroundGradient1: '#112630',
        backgroundGradient2: '#0b1f2c',
        text: '#d6deeb',
        accent: '#7fdbca',
        treeLines: '#82aaff'
    },
    original: {
        background: '#4b4949',
        backgroundGradient1: '#545454',
        backgroundGradient2: '#404040',
        text: 'white',
        accent: 'gold',
        treeLines: '#ccc'
    },
    light: {
        background: '#ffffff',
        backgroundGradient1: '#f5f5f5',
        backgroundGradient2: '#e0e0e0',
        text: '#2d2d2d',
        accent: '#2196f3',
        treeLines: '#757575'
    }
};

function setTheme(themeName) {
    const theme = themes[themeName];
    document.documentElement.style.setProperty('--background', theme.background);
    document.documentElement.style.setProperty('--gradient1', theme.backgroundGradient1);
    document.documentElement.style.setProperty('--gradient2', theme.backgroundGradient2);
    document.documentElement.style.setProperty('--text', theme.text);
    document.documentElement.style.setProperty('--accent', theme.accent);
    document.documentElement.style.setProperty('--tree-lines', theme.treeLines);

    // Update selected theme visual
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.remove('selected');
        const btnText = btn.textContent.trim().toLowerCase().replace(/\s+/g, '');
        if (btnText === themeName.toLowerCase()) {
            btn.classList.add('selected');
        }
    });

    localStorage.setItem('selectedTheme', themeName);
}

// Initialize theme and selected state
const savedTheme = localStorage.getItem('selectedTheme') || 'original';
setTheme(savedTheme);

function toggleThemeMenu() {
    const menu = document.querySelector('.theme-menu');
    menu.classList.toggle('show');
}

// Close theme menu when clicking outside
document.addEventListener('click', (e) => {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle.contains(e.target)) {
        document.querySelector('.theme-menu').classList.remove('show');
    }
});
