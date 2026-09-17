type Listener = () => void;
let listeners: Listener[] = [];

export function onUnauthorized(cb: Listener) {
    listeners.push(cb);
    return () => {
        listeners = listeners.filter((l) => l !== cb);
    };
}

export function emitUnauthorized() {
    listeners.forEach((l) => l());
}