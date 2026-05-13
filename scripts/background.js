(function() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = document.createElement('canvas');
    canvas.id = 'bg-flow';
    canvas.style.cssText = 'position:fixed;inset:0;z-index:-1;pointer-events:none;';
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');
    let mouseX = -500;
    let mouseY = -500;
    let width, height;
    let dpr = 1;
    let rafId;

    var bgRGB = '20, 20, 20';
    var accentRGB = '255, 215, 0';
    var isTouch = false;
    var zOff = Math.random() * 1000;
    var seed = Math.random() * 1e6;

    function getAccent() {
        var v = getComputedStyle(document.documentElement).getPropertyValue('--accent-rgb').trim();
        return v || accentRGB;
    }

    function getBackground() {
        var v = getComputedStyle(document.documentElement).getPropertyValue('--background-rgb').trim();
        return v || bgRGB;
    }

    function resize() {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
    }

    // Simple hash-based value noise
    function hash(x, y) {
        var h = (x * 374761393 + y * 668265263 + seed) | 0;
        h = (h ^ (h << 13)) >>> 0;
        return ((h * 1274126177) >>> 0) / 4294967296;
    }

    function valueNoise(x, y) {
        var x0 = Math.floor(x);
        var y0 = Math.floor(y);
        var xf = x - x0;
        var yf = y - y0;

        var a = hash(x0, y0);
        var b = hash(x0 + 1, y0);
        var c = hash(x0, y0 + 1);
        var d = hash(x0 + 1, y0 + 1);

        var u = xf * xf * (3 - 2 * xf);
        var v = yf * yf * (3 - 2 * yf);

        return a * (1 - u) * (1 - v) + b * u * (1 - v) + c * (1 - u) * v + d * u * v;
    }

    // Number of particles proportional to screen area
    function particleCount() {
        return Math.min(Math.floor((width * height) / 4000), 600);
    }

    var particles = [];

    function initParticles() {
        particles = [];
        var n = particleCount();
        for (var i = 0; i < n; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                life: Math.floor(Math.random() * 600),
                max: 300 + Math.floor(Math.random() * 600)
            });
        }
    }

    function draw() {
        rafId = requestAnimationFrame(draw);

        ctx.save();
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        // Fade old trails with background color
        ctx.globalAlpha = 0.025;
        ctx.fillStyle = 'rgb(' + bgRGB + ')';
        ctx.fillRect(0, 0, width, height);
        ctx.globalAlpha = 1;

        var speed = 0.7;
        var scale = 0.0022;

        for (var i = 0; i < particles.length; i++) {
            var p = particles[i];

            // Sample flow direction from noise field
            var nx = p.x * scale + zOff;
            var ny = p.y * scale + zOff;
            var n = valueNoise(nx, ny);

            // Mouse perturbation
            var dx = p.x - mouseX;
            var dy = p.y - mouseY;
            var dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 200 && dist > 0) {
                n += (0.3 * (1 - dist / 200)) * Math.sin(dist * 0.05 + zOff * 2);
            }

            var angle = n * Math.PI * 2 * 1.5;
            var vx = Math.cos(angle) * speed;
            var vy = Math.sin(angle) * speed;

            // Draw line segment
            var x2 = p.x + vx;
            var y2 = p.y + vy;

            var lifeRatio = p.life / p.max;
            var fadeIn = Math.min(lifeRatio * 4, 1);
            var fadeOut = Math.min((1 - lifeRatio) * 3, 1);
            var alpha = fadeIn * fadeOut * 0.7;

            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = 'rgba(' + accentRGB + ',' + alpha.toFixed(3) + ')';
            ctx.lineWidth = 1.2;
            ctx.stroke();

            p.x = x2;
            p.y = y2;
            p.life++;

            // Respawn if out of bounds or end of life
            if (p.x < -50 || p.x > width + 50 || p.y < -50 || p.y > height + 50 || p.life > p.max) {
                p.x = Math.random() * width;
                p.y = Math.random() * height;
                p.life = 0;
                p.max = 300 + Math.floor(Math.random() * 600);
            }
        }

        zOff += 0.0012;
        ctx.restore();
    }

    function start() {
        bgRGB = getBackground();
        accentRGB = getAccent();
        resize();
        // Prime canvas with background color so no flicker
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.fillStyle = 'rgb(' + bgRGB + ')';
        ctx.fillRect(0, 0, width, height);
        initParticles();
        draw();
    }

    start();

    window.addEventListener('resize', function() {
        resize();
        bgRGB = getBackground();
        accentRGB = getAccent();
        initParticles();
    });

    document.addEventListener('mousemove', function(e) {
        if (isTouch) return;
        mouseX = e.clientX;
        mouseY = e.clientY;
    }, { passive: true });

    document.addEventListener('touchstart', function() { isTouch = true; }, { once: true, passive: true });

    var observer = new MutationObserver(function() {
        bgRGB = getBackground();
        accentRGB = getAccent();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] });

    window.addEventListener('beforeunload', function() {
        if (rafId) cancelAnimationFrame(rafId);
    });
})();
