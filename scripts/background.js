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

    function particleCount() {
        return Math.min(Math.floor((width * height) / 5000), 500);
    }

    function wrap(val, max) {
        if (val < 0) return val + max;
        if (val > max) return val - max;
        return val;
    }

    var particles = [];
    var frameCount = 0;

    function initParticles() {
        particles = [];
        var n = particleCount();
        for (var i = 0; i < n; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: 0, vy: 0
            });
        }
    }

    function draw() {
        rafId = requestAnimationFrame(draw);

        currentBg = lerpColor(currentBg, targetBg, 0.1);
        currentAccent = lerpColor(currentAccent, targetAccent, 0.1);

        ctx.save();
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        // Periodic full clear to prevent residue buildup
        frameCount++;
        if (frameCount % 480 === 0) {
            ctx.globalAlpha = 1;
            ctx.fillStyle = 'rgb(' + currentBg[0] + ',' + currentBg[1] + ',' + currentBg[2] + ')';
            ctx.fillRect(0, 0, width, height);
        } else {
            // Normal fade: old color gradually replaced by background
            ctx.fillStyle = 'rgba(' + currentBg[0] + ',' + currentBg[1] + ',' + currentBg[2] + ',0.035)';
            ctx.fillRect(0, 0, width, height);
        }

        var speed = 1.1;
        var scale = 0.003;
        var mouseRadius = 180;
        var orbitStrength = 2.0;
        var attractStrength = 0.25;
        var ac = currentAccent[0] + ',' + currentAccent[1] + ',' + currentAccent[2];

        ctx.strokeStyle = 'rgba(' + ac + ',0.4)';
        ctx.lineWidth = 1.4;
        ctx.lineCap = 'round';

        for (var i = 0; i < particles.length; i++) {
            var p = particles[i];
            var prevX = p.x;
            var prevY = p.y;

            // Flow field angle from simplex noise
            var n = noise2D(p.x * scale + zOff * 0.25, p.y * scale + zOff * 0.25);
            var angle = (n + 1) * Math.PI;
            var fx = Math.cos(angle) * speed;
            var fy = Math.sin(angle) * speed;

            // Mouse orbit interaction
            var dx = p.x - mouseX;
            var dy = p.y - mouseY;
            var dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < mouseRadius && dist > 3) {
                var normX = dx / dist;
                var normY = dy / dist;
                var tanX = -normY;
                var tanY = normX;
                var infl = 1 - dist / mouseRadius;
                p.vx += (tanX * orbitStrength + normX * -attractStrength) * infl;
                p.vy += (tanY * orbitStrength + normY * -attractStrength) * infl;
            }

            p.vx += (fx - p.vx) * 0.08;
            p.vy += (fy - p.vy) * 0.08;

            var vel = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
            if (vel > speed * 2.5) {
                p.vx = (p.vx / vel) * speed * 2.5;
                p.vy = (p.vy / vel) * speed * 2.5;
            }

            p.x += p.vx;
            p.y += p.vy;

            // Wrap around edges so particles never vanish
            p.x = wrap(p.x, width);
            p.y = wrap(p.y, height);

            // Only draw if not wrapped this frame (prevents screen-crossing lines)
            var wrapDist = Math.abs(p.x - prevX) + Math.abs(p.y - prevY);
            if (wrapDist < width * 0.3) {
                ctx.beginPath();
                ctx.moveTo(prevX, prevY);
                ctx.lineTo(p.x, p.y);
                ctx.stroke();
            }
        }

        zOff += 0.0006;
        ctx.restore();
    }

    function start() {
        targetBg = getBackground();
        targetAccent = getAccent();
        currentBg = targetBg.slice();
        currentAccent = targetAccent.slice();
        resize();
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.fillStyle = 'rgb(' + currentBg[0] + ',' + currentBg[1] + ',' + currentBg[2] + ')';
        ctx.fillRect(0, 0, width, height);
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
        ctx.save();
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.fillStyle = 'rgb(' + currentBg[0] + ',' + currentBg[1] + ',' + currentBg[2] + ')';
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
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
        // Flush old colored trails with new background
        ctx.save();
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.globalAlpha = 1;
        ctx.fillStyle = 'rgb(' + targetBg[0] + ',' + targetBg[1] + ',' + targetBg[2] + ')';
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] });

    window.addEventListener('beforeunload', function() {
        if (rafId) cancelAnimationFrame(rafId);
    });
})();
