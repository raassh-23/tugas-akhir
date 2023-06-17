let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();

    deferredPrompt = e;
});

window.addEventListener('DOMContentLoaded', () => {
    let displayMode = 'browser tab';

    if (window.matchMedia('(display-mode: fullscreen)').matches) {
        displayMode = 'standalone';
    }

    console.log('DISPLAY_MODE_LAUNCH:', displayMode);
});

export function checkPrompt() {
    return !!deferredPrompt;
}

export async function installGame() {
    if (!deferredPrompt) {
        return;
    }

    const result = await deferredPrompt.prompt();

    console.log(result);

    deferredPrompt = null;
}
