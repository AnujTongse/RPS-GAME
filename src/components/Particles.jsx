import { useEffect, useRef } from 'react';

const Particles = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = [
      'rgba(168, 85, 247, 0.4)',
      'rgba(59, 130, 246, 0.4)',
      'rgba(236, 72, 153, 0.4)',
      'rgba(6, 182, 212, 0.35)',
      'rgba(249, 115, 22, 0.35)',
      'rgba(255, 217, 61, 0.3)',
    ];

    // Initialize particles
    const numParticles = 50;
    particlesRef.current = [];
    for (let i = 0; i < numParticles; i++) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 2, // 2 to 5
        speedX: (Math.random() - 0.5) * 0.6,
        speedY: (Math.random() - 0.5) * 0.6,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
      });
    }

    const animate = () => {
      try {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particlesRef.current.forEach((p) => {
          p.x += p.speedX;
          p.y += p.speedY;
          p.pulse += p.pulseSpeed;

          // Wrap around
          if (p.x < -10) p.x = canvas.width + 10;
          if (p.x > canvas.width + 10) p.x = -10;
          if (p.y < -10) p.y = canvas.height + 10;
          if (p.y > canvas.height + 10) p.y = -10;

          const currentSize = Math.max(1, p.size + Math.sin(p.pulse) * 1.2);
          const glowRadius = Math.max(2, currentSize * 2.5);

          // Glow
          ctx.beginPath();
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowRadius);
          gradient.addColorStop(0, p.color);
          gradient.addColorStop(1, 'transparent');
          ctx.fillStyle = gradient;
          ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
          ctx.fill();

          // Core
          ctx.beginPath();
          ctx.fillStyle = p.color.replace('0.4', '0.8').replace('0.35', '0.7').replace('0.3', '0.6');
          ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
          ctx.fill();
        });

        // Draw connections
        particlesRef.current.forEach((p1, i) => {
          particlesRef.current.slice(i + 1).forEach((p2) => {
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 100) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(168, 85, 247, ${0.12 * (1 - dist / 100)})`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          });
        });
      } catch (err) {
        console.warn('Particle animation error:', err);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};

export default Particles;
