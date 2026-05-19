(function() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = document.createElement('canvas');
    canvas.id = 'bg-flow';
    canvas.style.cssText = 'position:fixed;inset:0;z-index:-1;pointer-events:none;';
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');
    let mouseX = -9999;
    let mouseY = -9999;
    let width, height;
    let dpr = 1;
    let rafId;
    let isTouch = false;

    let targetBg = [20, 20, 20];
    let targetAccent = [255, 215, 0];
    let currentBg = [20, 20, 20];
    let currentAccent = [255, 215, 0];
    let zOff = Math.random() * 1000;

    function parseRGB(str) {
        var parts = str.split(',').map(function(s) { return parseInt(s.trim(), 10); });
        return [parts[0] || 0, parts[1] || 0, parts[2] || 0];
    }

    function getAccent() {
        var v = getComputedStyle(document.documentElement).getPropertyValue('--accent-rgb').trim();
        return parseRGB(v || '255, 215, 0');
    }

    function getBackground() {
        var v = getComputedStyle(document.documentElement).getPropertyValue('--background-rgb').trim();
        return parseRGB(v || '20, 20, 20');
    }

    function lerp(a, b, t) {
        return a + (b - a) * t;
    }

    function lerpColor(current, target, t) {
        return [
            Math.round(lerp(current[0], target[0], t)),
            Math.round(lerp(current[1], target[1], t)),
            Math.round(lerp(current[2], target[2], t))
        ];
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

    // Simplex 2D noise
    var perm = new Uint8Array(512);
    var p = new Uint8Array(256);
    for (var i = 0; i < 256; i++) p[i] = i;
    for (var i = 255; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = p[i]; p[i] = p[j]; p[j] = tmp;
    }
    for (var i = 0; i < 512; i++) perm[i] = p[i & 255];

    function noise2D(x, y) {
        var F2 = 0.5 * (Math.sqrt(3) - 1);
        var G2 = (3 - Math.sqrt(3)) / 6;
        var s = (x + y) * F2;
        var i = Math.floor(x + s);
        var j = Math.floor(y + s);
        var t = (i + j) * G2;
        var X0 = i - t;
        var Y0 = j - t;
        var x0 = x - X0;
        var y0 = y - Y0;
        var i1, j1;
        if (x0 > y0) { i1 = 1; j1 = 0; }
        else { i1 = 0; j1 = 1; }
        var x1 = x0 - i1 + G2;
        var y1 = y0 - j1 + G2;
        var x2 = x0 - 1 + 2 * G2;
        var y2 = y0 - 1 + 2 * G2;
        var ii = i & 255;
        var jj = j & 255;
        function grad(hash, x, y) {
            var h = hash & 7;
            var u = h < 4 ? x : y;
            var v = h < 4 ? y : x;
            return ((h & 1) ? -u : u) + ((h & 2) ? -2 * v : 2 * v);
        }
        var t0 = 0.5 - x0 * x0 - y0 * y0;
        var n0 = t0 < 0 ? 0 : (t0 *= t0, t0 * t0 * grad(perm[ii + perm[jj]], x0, y0));
        var t1 = 0.5 - x1 * x1 - y1 * y1;
        var n1 = t1 < 0 ? 0 : (t1 *= t1, t1 * t1 * grad(perm[ii + i1 + perm[jj + j1]], x1, y1));
        var t2 = 0.5 - x2 * x2 - y2 * y2;
        var n2 = t2 < 0 ? 0 : (t2 *= t2, t2 * t2 * grad(perm[ii + 1 + perm[jj + 1]], x2, y2));
        return 70 * (n0 + n1 + n2);
    }

    var particles = [];

    function particleCount() {
        return Math.min(Math.floor((width * height) / 5200), 460);
    }

    function initParticles() {
        particles = [];
        var n = particleCount();
        for (var i = 0; i < n; i++) {
            var x = Math.random() * width;
            var y = Math.random() * height;
            particles.push({
                anchorX: x,
                anchorY: y,
                x: x,
                y: y,
                vx: 0,
                vy: 0,
                phase: Math.random() * 1000,
                size: 0.6 + Math.random() * 1.2,
                alpha: 0.28 + Math.random() * 0.34
            });
        }
    }

    function paintBackground(color) {
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')';
        ctx.fillRect(0, 0, width, height);
    }

    function clamp(val, min, max) {
        return Math.max(min, Math.min(max, val));
    }

    function draw() {
        rafId = requestAnimationFrame(draw);

        currentBg = lerpColor(currentBg, targetBg, 0.1);
        currentAccent = lerpColor(currentAccent, targetAccent, 0.1);

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        paintBackground(currentBg);

        var driftScale = 0.004;
        var driftRange = Math.min(32, Math.max(14, Math.min(width, height) * 0.035));
        var mouseRadius = 180;
        var mousePush = 1.2;
        var mouseOrbit = 0.45;
        var ac = currentAccent[0] + ',' + currentAccent[1] + ',' + currentAccent[2];

        ctx.lineCap = 'round';

        for (var i = 0; i < particles.length; i++) {
            var p = particles[i];

            var driftX = noise2D(p.anchorX * driftScale + zOff, p.anchorY * driftScale + p.phase) * driftRange;
            var driftY = noise2D(p.anchorX * driftScale - p.phase, p.anchorY * driftScale + zOff) * driftRange;
            var targetX = clamp(p.anchorX + driftX, 0, width);
            var targetY = clamp(p.anchorY + driftY, 0, height);

            p.vx += (targetX - p.x) * 0.012;
            p.vy += (targetY - p.y) * 0.012;

            var dx = p.x - mouseX;
            var dy = p.y - mouseY;
            var dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < mouseRadius && dist > 3) {
                var normX = dx / dist;
                var normY = dy / dist;
                var tanX = -normY;
                var tanY = normX;
                var infl = 1 - dist / mouseRadius;
                p.vx += (normX * mousePush + tanX * mouseOrbit) * infl;
                p.vy += (normY * mousePush + tanY * mouseOrbit) * infl;
            }

            p.vx *= 0.9;
            p.vy *= 0.9;
            var vel = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
            if (vel > 3.2) {
                p.vx = (p.vx / vel) * 3.2;
                p.vy = (p.vy / vel) * 3.2;
            }

            p.x += p.vx;
            p.y += p.vy;
            p.x = clamp(p.x, 0, width);
            p.y = clamp(p.y, 0, height);

            ctx.beginPath();
            ctx.fillStyle = 'rgba(' + ac + ',' + p.alpha + ')';
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        }

        zOff += 0.003;
    }

    function start() {
        targetBg = getBackground();
        targetAccent = getAccent();
        currentBg = targetBg.slice();
        currentAccent = targetAccent.slice();
        resize();
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        paintBackground(currentBg);
        initParticles();
        draw();
    }

    start();

    window.addEventListener('resize', function() {
        resize();
        targetBg = getBackground();
        targetAccent = getAccent();
        currentBg = targetBg.slice();
        currentAccent = targetAccent.slice();
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        paintBackground(currentBg);
        initParticles();
    });

    document.addEventListener('mousemove', function(e) {
        if (isTouch) return;
        mouseX = e.clientX;
        mouseY = e.clientY;
    }, { passive: true });

    document.addEventListener('touchstart', function() { isTouch = true; }, { once: true, passive: true });

    var observer = new MutationObserver(function() {
        targetBg = getBackground();
        targetAccent = getAccent();
        currentBg = targetBg.slice();
        currentAccent = targetAccent.slice();
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        paintBackground(currentBg);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] });

    window.addEventListener('beforeunload', function() {
        if (rafId) cancelAnimationFrame(rafId);
    });
})();
