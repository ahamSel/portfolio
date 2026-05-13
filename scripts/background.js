(function() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = document.createElement('canvas');
    canvas.id = 'bg-dots';
    canvas.style.cssText = 'position:fixed;inset:0;z-index:-1;pointer-events:none;';
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');
    let mouseX = -500;
    let mouseY = -500;
    let width, height;
    let dpr = 1;
    let time = 0;
    let accentRGB = '255, 215, 0';
    let rafId;

    function getAccent() {
        var v = getComputedStyle(document.documentElement).getPropertyValue('--accent-rgb').trim();
        return v || accentRGB;
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

    var spacing = 32;
    var baseRadius = 1.6;
    var rippleRadius = 200;
    var isTouch = false;

    function draw() {
        rafId = requestAnimationFrame(draw);
        time += 0.016;

        ctx.save();
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, width, height);

        var cols = Math.ceil(width / spacing) + 1;
        var rows = Math.ceil(height / spacing) + 1;
        var t = time;

        ctx.fillStyle = 'rgb(' + accentRGB + ')';

        for (var i = 0; i < cols; i++) {
            for (var j = 0; j < rows; j++) {
                var x = i * spacing;
                var y = j * spacing;

                var wave = Math.sin(t * 0.6 + x * 0.007 + y * 0.009) * 0.18;
                var alpha = 0.18 + wave;
                var r = baseRadius;

                var dx = mouseX - x;
                var dy = mouseY - y;
                var dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < rippleRadius) {
                    var pct = 1 - dist / rippleRadius;
                    var ease = pct * pct;
                    r = baseRadius + baseRadius * 2.5 * ease;
                    alpha = alpha + 0.3 * ease;
                    if (alpha > 0.5) alpha = 0.5;
                }

                ctx.globalAlpha = alpha;
                ctx.beginPath();
                ctx.arc(x, y, r, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        ctx.restore();
    }

    accentRGB = getAccent();
    resize();
    draw();

    window.addEventListener('resize', function() {
        resize();
        accentRGB = getAccent();
    });

    document.addEventListener('mousemove', function(e) {
        if (isTouch) return;
        mouseX = e.clientX;
        mouseY = e.clientY;
    }, { passive: true });

    document.addEventListener('touchstart', function() { isTouch = true; }, { once: true, passive: true });

    var observer = new MutationObserver(function() {
        accentRGB = getAccent();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] });

    window.addEventListener('beforeunload', function() {
        if (rafId) cancelAnimationFrame(rafId);
    });
})();
