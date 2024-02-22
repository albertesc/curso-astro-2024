import spanish from './es.json';
import english from './en.json';

const LANGUAGES = { // 👈 Creamos un objeto con los idiomas para no tener magic strings
    SPANISH: 'es',
    ENGLISH: 'en'
}

function getI18N ({ currentLocale }) { // 👈 Creamos una función que recibe el idioma actual
    if(currentLocale === LANGUAGES.ENGLISH) return english; // 👈 Si el idioma actual es inglés, retornamos el JSON en inglés
    if(currentLocale === LANGUAGES.SPANISH) return spanish; // 👈 Si el idioma actual es español, retornamos el JSON en español
    return english; // 👈 Si no se encuentra el idioma, retornamos el JSON en inglés
}

export { LANGUAGES, getI18N } // 👈 Exportamos las constantes y la función