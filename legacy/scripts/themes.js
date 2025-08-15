const themes = {
    nightOwl: {
        background: '#011627',
        backgroundRGB: '1, 22, 39',
        backgroundGradient1: '#112630',
        backgroundGradient2: '#0b1f2c',
        text: '#d6deeb',
        accent: '#7fdbca',
        treeLines: '#82aaff'
    },
    original: {
        background: '#4b4949',
        backgroundRGB: '75, 73, 73',
        backgroundGradient1: '#545454',
        backgroundGradient2: '#404040',
        text: 'white',
        accent: 'gold',
        treeLines: '#ccc'
    },
    light: {
        background: '#ffffff',
        backgroundRGB: '255, 255, 255',
        backgroundGradient1: '#f5f5f5',
        backgroundGradient2: '#e0e0e0',
        text: '#2d2d2d',
        accent: '#2196f3',
        treeLines: '#757575'
    }
};

(function() {
    const savedTheme = localStorage.getItem('selectedTheme') || 'original';
    const theme = themes[savedTheme];
    
    // Create and inject a style element
    const style = document.createElement('style');
    style.textContent = `
        :root {
            --background: ${theme ? theme.background : themes.original.background};
            --background-rgb: ${theme ? theme.backgroundRGB : themes.original.backgroundRGB};
            --gradient1: ${theme ? theme.backgroundGradient1 : themes.original.backgroundGradient1};
            --gradient2: ${theme ? theme.backgroundGradient2 : themes.original.backgroundGradient2};
            --text: ${theme ? theme.text : themes.original.text};
            --accent: ${theme ? theme.accent : themes.original.accent};
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
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('selectedTheme') || 'original';
    setTheme(savedTheme);
});

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
