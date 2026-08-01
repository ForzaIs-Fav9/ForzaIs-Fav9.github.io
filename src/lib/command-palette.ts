type Listener = () => void;

let isOpen = false;
const listeners = new Set<Listener>();

function notify() {
  listeners.forEach((fn) => fn());
}

export const commandPalette = {
  open() {
    if (!isOpen) {
      isOpen = true;
      notify();
    }
  },
  close() {
    if (isOpen) {
      isOpen = false;
      notify();
    }
  },
  toggle() {
    isOpen = !isOpen;
    notify();
  },
  get isOpen() {
    return isOpen;
  },
  subscribe(fn: Listener) {
    listeners.add(fn);
    return () => { listeners.delete(fn); };
  },
};
