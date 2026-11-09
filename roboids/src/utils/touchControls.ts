export type TouchKeyCode = 'ArrowLeft' | 'ArrowRight' | 'ArrowUp' | 'Space';
type Listener = (code: TouchKeyCode, pressed: boolean) => void;

const listeners = new Set<Listener>();
const pressedKeys = new Set<TouchKeyCode>();

export const isMobile = () => /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

/** タッチパネルの入力を購読する。戻り値は購読解除関数。 */
export function subscribeTouchKeys(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function emit(code: TouchKeyCode, pressed: boolean) {
  if (pressed === pressedKeys.has(code)) return;
  if (pressed) pressedKeys.add(code);
  else pressedKeys.delete(code);
  for (const l of listeners) l(code, pressed);
}

const BUTTONS: { code: TouchKeyCode; label: string; group: 'move' | 'action' }[] = [
  { code: 'ArrowLeft', label: '◀︎', group: 'move' },
  { code: 'ArrowRight', label: '▶︎', group: 'move' },
  { code: 'ArrowUp', label: 'JUMP', group: 'action' },
  { code: 'Space', label: 'ACT', group: 'action' },
];

/** スマホ(UA判定)の場合のみ、ゲーム画面下に半透明の操作パネルを表示する */
export function setupTouchControls() {
  if (!isMobile()) return;

  const style = document.createElement('style');
  style.textContent = `
    #touch-controls {
      position: fixed; left: 0; right: 0; bottom: 0;
      display: flex; justify-content: space-between; align-items: center;
      padding: 12px 16px calc(40px + env(safe-area-inset-bottom));
      box-sizing: border-box; pointer-events: none; z-index: 10;
      user-select: none; -webkit-user-select: none; touch-action: none;
    }
    #touch-controls .group { display: flex; gap: 16px; }
    #touch-controls button {
      pointer-events: auto; touch-action: none;
      width: 76px; height: 76px; border-radius: 50%;
      border: 2px solid rgba(255,255,255,0.8);
      background: rgba(255,255,255,0.3); color: #fff;
      font: bold 14px sans-serif; -webkit-tap-highlight-color: transparent;
    }
    #touch-controls button.active { background: rgba(255,255,255,0.6); }
    @media (max-width: 400px) {
      #touch-controls .group { gap: 12px; }
      #touch-controls button {
        width: 66px; height: 66px; border-radius: 50%;
      }
    }
  `;
  document.head.appendChild(style);

  const panel = document.createElement('div');
  panel.id = 'touch-controls';
  const groups = {
    move: document.createElement('div'),
    action: document.createElement('div'),
  };
  for (const g of Object.values(groups)) {
    g.className = 'group';
    panel.appendChild(g);
  }

  for (const { code, label, group } of BUTTONS) {
    const btn = document.createElement('button');
    btn.textContent = label;
    const set = (pressed: boolean) => {
      btn.classList.toggle('active', pressed);
      emit(code, pressed);
    };
    btn.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      btn.setPointerCapture(e.pointerId);
      set(true);
    });
    for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) {
      btn.addEventListener(type, () => set(false));
    }
    btn.addEventListener('contextmenu', (e) => e.preventDefault());
    groups[group].appendChild(btn);
  }
  document.body.appendChild(panel);
}
