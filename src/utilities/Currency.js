
export const currency = new Intl.NumberFormat(process.env.NEXT_PUBLIC_CURRENCY_LANGUAGE, {
    currency: process.env.NEXT_PUBLIC_CURRENCY,
    style: "currency",
    currencyDisplay: process.env.NEXT_PUBLIC_CURRENCY_SYMBOL,
    notation: "compact"
})


export const formatCurrency = (value, locale) => {
    const currencySymbol = getCurrencySymbol(locale);
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currencySymbol,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
};

const getCurrencySymbol = (locale) => {
    switch (locale) {
        case 'en-US':
            return 'USD';
        case 'en-GB':
            return 'GBP';
        case 'fr-FR':
            return 'EUR';
        case 'ja-JP':
            return 'JPY';
        case 'ko-KR':
            return 'KRW';
        case 'es-ES':
            return 'EUR';
        case 'en-KE':
            return 'KSH';
        // add more cases for other locales as needed
        default:
            return 'USD';
    }
};
