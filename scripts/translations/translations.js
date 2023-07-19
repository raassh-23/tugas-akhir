import en from "./en.js";
import id from "./id.js";

/**
 * @returns {Promise<void>}
 */
export async function initTranslations() {
    await i18next
        .use(window.i18nextBrowserLanguageDetector)
        .init({
            fallbackLng: 'en',
            debug: true,
            resources: { id, en },
        });
}

/**
 * 
 * @param {string} key 
 * @param {string} interpolations in format "key1::value1,key2::value2,..."
 * @returns 
 */
export function translate(key, interpolations = "") {
    const options = {};

    interpolations.split(",").forEach((interpolation) => {
        const [interpolationKey, interpolationValue] = interpolation.split("::");
        options[interpolationKey] = interpolationValue;
    })

    return i18next.t(key, options);
}

export async function changeLanguage(language) {
    await i18next.changeLanguage(language);
}
