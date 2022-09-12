import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import { ar, en } from './supportedLanguages';

export const locale = Localization.locale;

export default new I18n({ ar, en }, {
    locale: Localization.locale,
    enableFallback: true
});
