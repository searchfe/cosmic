const colors = require('tailwindcss/colors');

// 加 * 为目前在用规范，其余的可后续酌情删除
const widthConfigs = {
    0: '0rem',
    0.5: '0.05rem',
    1: '1rem',
    2: '0.2rem',
    4: '0.4rem',
    5: '0.5rem',
    6: '0.6rem',
    7: '0.7rem',
    8: '0.8rem',
    10: '1rem',
    12: '1.2rem',
    14: '1.4rem',
    16: '1.6rem',
    18: '1.8rem',
    20: '2rem',
    22: '2.2rem',
    24: '2.4rem',
    26: '2.6rem',
    30: '3rem',
    36: '3.6rem',
    40: '4rem',
    44: '4.4rem',
    68: '6.8rem',
    70: '7rem',
    78: '7.8rem',
    106: '10.6rem',
    120: '12rem',
    168: '16.8rem',
    240: '24rem',
    270: '27rem',
    370: '37rem',
    418: '41.8rem',
    520: '52rem',
    890: '89rem',
    px: '1px',
    '1/2': '50%',
    '1/3': '33.333333%',
    '2/3': '66.666667%',
    '1/4': '25%',
    '2/4': '50%',
    '3/4': '75%',
    '1/5': '20%',
    '2/5': '40%',
    '3/5': '60%',
    '4/5': '80%',
    '1/6': '16.666667%',
    '2/6': '33.333333%',
    '3/6': '50%',
    '4/6': '66.666667%',
    '5/6': '83.333333%',
    '1/12': '8.333333%',
    '2/12': '16.666667%',
    '3/12': '25%',
    '4/12': '33.333333%',
    '5/12': '41.666667%',
    '6/12': '50%',
    '7/12': '58.333333%',
    '8/12': '66.666667%',
    '9/12': '75%',
    '1/10': '10%',
    '9/10': '10%',
    '10/12': '83.333333%',
    '11/12': '91.666667%',
    '1/29': '3.5%',
    '17/100': '17%',
    full: '100%',
    screen: '100vw',
};

module.exports = {
    plugins: [require('tailwindcss-typography')],
    theme: {
        screens: {
            md: '960px',
            lg: '1200px',
            xl: '1400px',
            '2xl': '1920px',
        },
        spacing: widthConfigs,
        // width: widthConfigs,
        // maxWidth: widthConfigs,
        // minWidth: widthConfigs,
        fontSize: {
            h1: ['2.4rem', '2.4rem'],
            h2: ['2rem', '2rem'],
            h3: ['1.6rem', '1.6rem'],
            h4: ['1.4rem', '1.4rem'],
            base: ['1.2rem', '1.2rem'],
            lg: ['1.8rem', '1.8rem'],
            xl: ['2.2rem', '2.2rem'],
        },
        colors: {
            cgray: {
                light: colors.trueGray[400],
                DEFAULT: colors.trueGray[400],
                dark: colors.trueGray[600],
                50: colors.trueGray[50],
                100: colors.trueGray[100],
                200: colors.trueGray[200],
                300: colors.trueGray[300],
                400: colors.trueGray[400],
                500: colors.trueGray[500],
                600: colors.trueGray[600],
                700: colors.trueGray[700],
                800: colors.trueGray[800],
                900: colors.trueGray[900],
            },
            gray: {
                100: '#f5f5f5',
                200: 'rgba(31,31,31,0.06)',
                300: 'rgba(31,31,31,0.1)',
                400: 'rgba(31,31,31,0.3)',
                500: 'rgba(31,31,31,0.7)',
                600: '#25252b',
                700: '#1f1f1f',
                800: '#1c1c20',
            },
            black: {
                DEFAULT: '#1f1f1f',
            },
            white: {
                DEFAULT: '#ffffff',
                700: 'rgba(255,255,255,0.7)',
            },
            blue: {
                DEFAULT: '#546bff',
                100: 'rgba(84,107,255,0.7)',
                200: '#546bff',
            },
            error: {
                light: colors.red[400],
                DEFAULT: colors.red[400],
                dark: colors.red[600],
            },
            alert: {
                light: colors.blue[700],
                DEFAULT: colors.blue[700],
                dark: colors.blue[300],
            },
            active: {
                light: colors.blue[400],
                DEFAULT: colors.blue[400],
                dark: colors.blue[400],
            },
        },
        transitionDuration: { 100: '0ms', 200: '0ms' },
        boxShadow: {
            card: '1px 4px 6px 0 rgba(0, 0, 0, 0.1)',
            sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
            DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
            md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
            inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
            dialog: '0 1px 2px 0 rgba(0, 0, 0, 0.5)',
            none: 'none',
        },
        borderRadius: {
            sm: '0.4rem',
            none: '0',
            DEFAULT: '0.4rem',
            xl: '0.8rem',
            '3xl': '1.6rem',
            '4xl': '1.8rem',
            full: '9999px',
        },
        textShadow: {
            none: 'none',
        },
    },
    // Extend Tailwind theme
    variants: {
        extend: {
            backgroundColor: ['active'],
            textColor: ['active', 'hover'],
            opacity: ['active', 'hover'],
            boxShadow: ['active', 'hover'],
        },
    },
    darkMode: 'media',
};
