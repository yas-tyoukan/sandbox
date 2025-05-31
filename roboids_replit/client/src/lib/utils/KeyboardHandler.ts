export class KeyboardHandler {
  private keys: Set<string> = new Set();
  private keyDownHandler: (event: KeyboardEvent) => void;
  private keyUpHandler: (event: KeyboardEvent) => void;

  constructor() {
    this.keyDownHandler = (event: KeyboardEvent) => {
      this.keys.add(event.code);
      // Prevent default for game controls
      if (['KeyW', 'KeyA', 'KeyD', 'Space', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(event.code)) {
        event.preventDefault();
      }
    };

    this.keyUpHandler = (event: KeyboardEvent) => {
      this.keys.delete(event.code);
    };

    window.addEventListener('keydown', this.keyDownHandler);
    window.addEventListener('keyup', this.keyUpHandler);
  }

  isKeyPressed(key: string): boolean {
    return this.keys.has(key);
  }

  getKeys(): Set<string> {
    return this.keys;
  }

  destroy() {
    window.removeEventListener('keydown', this.keyDownHandler);
    window.removeEventListener('keyup', this.keyUpHandler);
  }
}
