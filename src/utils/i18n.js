import NextI18Next from 'next-i18next'

const NextI18NextInstance = new NextI18Next({
    defaultLanguage: 'en',
    lng: 'en',
    otherLanguages: ['ru'],
});

export default NextI18NextInstance

/* Optionally, export class methods as named exports */
export const {
    appWithTranslation,
    withTranslation,
    i18n
} = NextI18NextInstance;
