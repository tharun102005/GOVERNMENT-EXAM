import { useEffect, useRef } from 'react';

/**
 * ParticleBackground
 * Full-screen canvas with floating blue dots connected by faint lines near cursor.
 * Uses requestAnimationFrame for smooth 60 FPS animation.
 */

const PARTICLE_COUNT  = 55;
const PRIMARY_COLOR   = '37,99,235';    // RGB for #2563EB
const SECONDARY_COLOR = '96,165,250';   // RGB for #60A5FA
const MAX_LINK_DIST   = 130;
const CURSOR_ATTRACT  = 80;  // px radius where lines brighten

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

class Particle {
  constructor(canvas) {
    this.reset(canvas);
  }
  reset(canvas) {
    this.x  = randomBetween(0, canvas.width);
    this.y  = randomBetween(0, canvas.height);
    this.vx = randomBetween(-0.25, 0.25);
    this.vy = randomBetween(-0.25, 0.25);
    this.r  = randomBetween(1.5, 3);
    this.color = Math.random() > 0.5 ? PRIMARY_COLOR : SECONDARY_COLOR;
    this.alpha = randomBetween(0.3, 0.7);
  }
  update(canvas) {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < -10) this.x = canvas.width  + 10;
    if (this.x > canvas.width  + 10) this.x = -10;
    if (this.y < -10) this.y = canvas.height + 10;
    if (this.y > canvas.height + 10) this.y = -10;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
    ctx.shadowBlur = 8;
    ctx.shadowColor = `rgba(${this.color},0.5)`;
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

export default function ParticleBackground({ mouseRef }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Resize canvas
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Check reduced motion
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return () => window.removeEventListener('resize', resize);

    // Create particles
    const particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle(canvas));

    let rafId;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mx = mouseRef?.current?.x ?? -9999;
      const my = mouseRef?.current?.y ?? -9999;

      // Update & draw particles
      for (const p of particles) {
        p.update(canvas);
        p.draw(ctx);
      }

      // Draw connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist > MAX_LINK_DIST) continue;

          // Brighten lines near cursor
          const midX = (a.x + b.x) / 2;
          const midY = (a.y + b.y) / 2;
          const cursorDist = Math.hypot(midX - mx, midY - my);
          const cursorBoost = cursorDist < CURSOR_ATTRACT ? (1 - cursorDist / CURSOR_ATTRACT) * 0.4 : 0;

          const alpha = (1 - dist / MAX_LINK_DIST) * 0.12 + cursorBoost;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(${PRIMARY_COLOR},${alpha.toFixed(3)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      rafId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, [mouseRef]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.6,
      }}
      aria-hidden="true"
    />
  );
}
