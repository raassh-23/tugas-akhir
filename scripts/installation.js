let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();

    deferredPrompt = e;
});

/**
 * 
 * @returns {'installed' | 'installable' | 'unsupported'}
 */
export function checkPrompt() {
    let displayMode = 'browser';

    if (window.matchMedia('(display-mode: fullscreen)').matches) {
        displayMode = 'fullscreen';
    } else if (window.matchMedia('(display-mode: standalone)').matches) {
        displayMode = 'standalone';
    } else if (window.matchMedia('(display-mode: minimal-ui)').matches) {
        displayMode = 'minimal-ui';
    }

    console.log('DISPLAY_MODE_LAUNCH:', displayMode);

    if (displayMode !== 'browser') {
        return 'installed';
    } else if (deferredPrompt) {
        return 'installable';
    } else {
        return 'unsupported';
    }
}

/**
 * 
 * @returns {Promise<Boolean>}
 */
export async function installGame() {
    if (!deferredPrompt) {
        return false;
    }

    const result = await deferredPrompt.prompt();

    deferredPrompt = null;

    return result.outcome === 'accepted';
}
