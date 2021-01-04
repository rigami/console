import polyglotI18nProvider from 'ra-i18n-polyglot';
import i18nMessages from 'ra-language-english';

const i18nProvider = polyglotI18nProvider(locale => i18nMessages, 'en', { allowMissing: true });

export default i18nProvider;
