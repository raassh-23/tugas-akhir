import en from "./en.js";
import id from "./id.js";

export async function initTranslations() {
    await i18next.init({
        lng: 'id',
        debug: true,
        resources: { id, en },
    });
}

export function translate(key, values) {
    const options = {};

    values.split(",").forEach((value) => {
        const [interpolationKey, interpolationValue] = value.split(":");
        options[interpolationKey] = interpolationValue;
    })

    return i18next.t(key, options);
}

export async function changeLanguage(language) {
    await i18next.changeLanguage(language);
}
