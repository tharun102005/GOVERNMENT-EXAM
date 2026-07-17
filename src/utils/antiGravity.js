/**
 * antiGravity.js
 * Premium Anti-Gravity Mouse Interaction Engine
 * GPU-accelerated · requestAnimationFrame · Spring physics · 60 FPS
 */

// ─── Constants ───────────────────────────────────────────────────────────────
const COLORS = {
  primary:   '#2563EB',
  secondary: '#3B82F6',
  accent:    '#60A5FA',
  glow:      'rgba(37,99,235,0.15)',
};

const SPRING_STIFFNESS  = 0.12;
const SPRING_DAMPING    = 0.80;
const REPEL_MAX_DIST    = 120;   // px — radius within which repulsion acts
const REPEL_MAX_OFFSET  = 15;    // px — max displacement
const CARD_TILT_MAX     = 12;    // deg
const TRAIL_MAX         = 18;    // particle count in trail
const TRAIL_TTL         = 600;   // ms — each trail particle lives for
const ICON_ROTATE_MAX   = 15;    // deg

// ─── State ────────────────────────────────────────────────────────────────────
let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
let rafId = null;
let reducedMotion = false;
let trailPool = [];
let isTouch = false;

// ─── Reduced-motion detection ─────────────────────────────────────────────────
const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
reducedMotion = motionQuery.matches;
motionQuery.addEventListener('change', e => { reducedMotion = e.matches; });

// ─── Touch detection ──────────────────────────────────────────────────────────
window.addEventListener('touchstart', () => { isTouch = true; }, { once: true });

// ═════════════════════════════════════════════════════════════════════════════
// MOUSE TRAIL
// ═════════════════════════════════════════════════════════════════════════════
function spawnTrailParticle() {
  const el = document.createElement('div');
  const size = Math.random() * 5 + 3;
  const hue  = Math.random() > 0.5 ? COLORS.primary : COLORS.accent;
  el.style.cssText = `
    position: fixed; pointer-events: none; z-index: 999990;
    width: ${size}px; height: ${size}px; border-radius: 50%;
    background: ${hue};
    box-shadow: 0 0 6px ${hue};
    transform: translate(-50%,-50%);
    will-change: transform, opacity;
    transition: opacity 0.6s ease;
  `;
  el.style.left = `${mouse.x}px`;
  el.style.top  = `${mouse.y}px`;
  el.style.opacity = '0.85';
  document.body.appendChild(el);

  const born = performance.now();
  trailPool.push({ el, born });

  // Begin fade
  requestAnimationFrame(() => {
    el.style.opacity = '0';
  });
}

let lastTrailTime = 0;
function maybeSpawnTrail(now) {
  if (now - lastTrailTime < 40) return; // ~25 per second
  if (trailPool.length >= TRAIL_MAX) {
    const oldest = trailPool.shift();
    oldest.el.remove();
  }
  spawnTrailParticle();
  lastTrailTime = now;
}

function cleanTrail(now) {
  trailPool = trailPool.filter(p => {
    if (now - p.born > TRAIL_TTL) { p.el.remove(); return false; }
    return true;
  });
}

// ═════════════════════════════════════════════════════════════════════════════
// ANTI-GRAVITY REPULSION  (cards, buttons)
// ═════════════════════════════════════════════════════════════════════════════
// Each element tracked: { el, targetX, targetY, currentX, currentY, vx, vy }
let repelElements = [];

function refreshRepelElements() {
  repelElements = Array.from(
    document.querySelectorAll('[data-antigrav="card"],[data-antigrav="button"]')
  ).map(el => {
    const existing = repelElements.find(r => r.el === el);
    return existing || { el, currentX: 0, currentY: 0, vx: 0, vy: 0, targetX: 0, targetY: 0 };
  });
}

function computeRepel(el) {
  const rect = el.getBoundingClientRect();
  const cx = rect.left + rect.width  / 2;
  const cy = rect.top  + rect.height / 2;
  const dx = mouse.x - cx;
  const dy = mouse.y - cy;
  const dist = Math.hypot(dx, dy);
  if (dist > REPEL_MAX_DIST) return { tx: 0, ty: 0 };
  const strength = (1 - dist / REPEL_MAX_DIST) * REPEL_MAX_OFFSET;
  return { tx: -(dx / dist) * strength, ty: -(dy / dist) * strength };
}

function updateRepelElements() {
  for (const r of repelElements) {
    const { tx, ty } = computeRepel(r.el);
    r.targetX = tx;
    r.targetY = ty;

    // Spring integration
    const forceX = (r.targetX - r.currentX) * SPRING_STIFFNESS;
    const forceY = (r.targetY - r.currentY) * SPRING_STIFFNESS;
    r.vx = r.vx * SPRING_DAMPING + forceX;
    r.vy = r.vy * SPRING_DAMPING + forceY;
    r.currentX += r.vx;
    r.currentY += r.vy;

    const isCard = r.el.dataset.antigrav === 'card';
    if (isCard) {
      const tilX = parseFloat(getComputedStyle(r.el).getPropertyValue('--tilt-x')) || 0;
      const tilY = parseFloat(getComputedStyle(r.el).getPropertyValue('--tilt-y')) || 0;
      r.el.style.transform = `perspective(900px) rotateX(${tilX.toFixed(2)}deg) rotateY(${tilY.toFixed(2)}deg) translate(${r.currentX.toFixed(2)}px, ${r.currentY.toFixed(2)}px)`;
    } else {
      r.el.style.transform = `translate(${r.currentX.toFixed(2)}px, ${r.currentY.toFixed(2)}px)`;
    }
  }
}

// ═════════════════════════════════════════════════════════════════════════════
// 3D CARD TILT
// ═════════════════════════════════════════════════════════════════════════════
function updateCardTilt() {
  const cards = document.querySelectorAll('[data-antigrav="card"]');
  for (const card of cards) {
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = (mouse.x - cx) / (rect.width  / 2);
    const dy = (mouse.y - cy) / (rect.height / 2);
    const dist = Math.hypot(mouse.x - cx, mouse.y - cy);
    const inRange = dist < Math.max(rect.width, rect.height) * 1.2;

    if (inRange) {
      const rotX = -dy * CARD_TILT_MAX;
      const rotY =  dx * CARD_TILT_MAX;
      card.style.setProperty('--tilt-x', `${rotX.toFixed(2)}deg`);
      card.style.setProperty('--tilt-y', `${rotY.toFixed(2)}deg`);
    } else {
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
    }
  }
}

// ═════════════════════════════════════════════════════════════════════════════
// FLOATING ICONS
// ═════════════════════════════════════════════════════════════════════════════
function updateIconRotation() {
  const icons = document.querySelectorAll('[data-antigrav="icon"]');
  for (const icon of icons) {
    const rect = icon.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    const angle = Math.atan2(mouse.y - cy, mouse.x - cx) * (180 / Math.PI);
    const dist  = Math.hypot(mouse.x - cx, mouse.y - cy);
    const t = Math.max(0, 1 - dist / 200);
    icon.style.setProperty('--icon-rotate', `${(angle * t * 0.3).toFixed(2)}deg`);
  }
}

// ═════════════════════════════════════════════════════════════════════════════
// MAIN RAF LOOP
// ═════════════════════════════════════════════════════════════════════════════
let lastRefresh = 0;

function loop(now) {
  rafId = requestAnimationFrame(loop);

  if (reducedMotion || isTouch) return;

  maybeSpawnTrail(now);
  cleanTrail(now);
  updateCardTilt();
  updateIconRotation();

  // Refresh repel element list every 2s (cheaper than MutationObserver)
  if (now - lastRefresh > 2000) {
    refreshRepelElements();
    lastRefresh = now;
  }
  updateRepelElements();
}

// ═════════════════════════════════════════════════════════════════════════════
// RIPPLE ON BUTTON CLICK
// ═════════════════════════════════════════════════════════════════════════════
function bindRipple() {
  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-antigrav="button"], button');
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height) * 2;
    ripple.style.cssText = `
      position: absolute; border-radius: 50%; pointer-events: none;
      width: ${size}px; height: ${size}px;
      left: ${e.clientX - rect.left - size / 2}px;
      top:  ${e.clientY - rect.top  - size / 2}px;
      background: rgba(96,165,250,0.35);
      transform: scale(0);
      animation: ag-ripple 0.6s ease-out forwards;
    `;
    // Ensure button has relative positioning
    const prevPos = getComputedStyle(btn).position;
    if (prevPos === 'static') btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    btn.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });
}

// ═════════════════════════════════════════════════════════════════════════════
// INITIALISE
// ═════════════════════════════════════════════════════════════════════════════
export function initAntiGravity() {
  if (typeof window === 'undefined') return;

  // Track mouse
  window.addEventListener('pointermove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  bindRipple();
  refreshRepelElements();

  // Start loop
  rafId = requestAnimationFrame(loop);

  // Refresh on DOM changes
  const observer = new MutationObserver(() => refreshRepelElements());
  observer.observe(document.body, { childList: true, subtree: true });

  return () => {
    cancelAnimationFrame(rafId);
    observer.disconnect();
    trailPool.forEach(p => p.el.remove());
    trailPool = [];
  };
}

export { mouse };
