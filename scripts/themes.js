const themes = {
    nightOwl: {
        background: '#011627',
        backgroundRGB: '1, 22, 39',
        backgroundGradient1: '#112630',
        backgroundGradient2: '#0b1f2c',
        text: '#d6deeb',
        accent: '#7fdbca',
        accentRGB: '127, 219, 202',
        treeLines: '#82aaff'
    },
    original: {
        background: '#141414',
        backgroundRGB: '20, 20, 20',
        backgroundGradient1: '#262626',
        backgroundGradient2: '#0a0a0a',
        text: 'white',
        accent: 'gold',
        accentRGB: '255, 215, 0',
        treeLines: '#aaa'
    },
    light: {
        background: '#ffffff',
        backgroundRGB: '255, 255, 255',
        backgroundGradient1: '#f5f5f5',
        backgroundGradient2: '#e0e0e0',
        text: '#2d2d2d',
        accent: '#2196f3',
        accentRGB: '33, 150, 243',
        treeLines: '#757575'
    }
};

(function() {
    const savedTheme = localStorage.getItem('selectedTheme') || 'original';
    const theme = themes[savedTheme];

    const style = document.createElement('style');
    style.textContent = `
        :root {
            --background: ${theme ? theme.background : themes.original.background};
            --background-rgb: ${theme ? theme.backgroundRGB : themes.original.backgroundRGB};
            --gradient1: ${theme ? theme.backgroundGradient1 : themes.original.backgroundGradient1};
            --gradient2: ${theme ? theme.backgroundGradient2 : themes.original.backgroundGradient2};
            --text: ${theme ? theme.text : themes.original.text};
            --accent: ${theme ? theme.accent : themes.original.accent};
            --accent-rgb: ${theme ? theme.accentRGB : themes.original.accentRGB};
            --tree-lines: ${theme ? theme.treeLines : themes.original.treeLines};
        }
    `;
    document.head.appendChild(style);
})();

function setTheme(themeName) {
    const theme = themes[themeName];
    document.documentElement.style.setProperty('--background', theme.background);
    document.documentElement.style.setProperty('--background-rgb', theme.backgroundRGB);
    document.documentElement.style.setProperty('--gradient1', theme.backgroundGradient1);
    document.documentElement.style.setProperty('--gradient2', theme.backgroundGradient2);
    document.documentElement.style.setProperty('--text', theme.text);
    document.documentElement.style.setProperty('--accent', theme.accent);
    document.documentElement.style.setProperty('--accent-rgb', theme.accentRGB);
    document.documentElement.style.setProperty('--tree-lines', theme.treeLines);

    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.remove('selected');
        if (btn.dataset.theme === themeName) {
            btn.classList.add('selected');
        }
    });

    localStorage.setItem('selectedTheme', themeName);
}

document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('selectedTheme') || 'original';
    setTheme(savedTheme);
    const toggleBtn = document.querySelector('.theme-toggle-btn');
    if (toggleBtn) {
        toggleBtn.setAttribute('aria-expanded', 'false');
    }
});

function toggleThemeMenu() {
    const menu = document.querySelector('.theme-menu');
    const btn = document.querySelector('.theme-toggle-btn');
    menu.classList.toggle('show');
    const isOpen = menu.classList.contains('show');
    if (btn) {
        btn.setAttribute('aria-expanded', isOpen);
    }
}

document.addEventListener('click', (e) => {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle.contains(e.target)) {
        document.querySelector('.theme-menu').classList.remove('show');
        const btn = document.querySelector('.theme-toggle-btn');
        if (btn) {
            btn.setAttribute('aria-expanded', 'false');
        }
    }
});
