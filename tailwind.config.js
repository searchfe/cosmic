const colors = require('tailwindcss/colors');

module.exports = {
    theme: {
        extend: {
            spacing: {
                1: '0.3rem',
                2: '0.6rem', // 标准行高
                3: '0.8rem',
                4: '1rem',
                5: '1.5rem',
                6: '2rem',
                7: '2.5rem',
                8: '3rem',
                9: '3.5rem',
                10: '5rem',
                11: '8rem',
                12: '12rem',
                13: '16rem',
                14: '20rem',
                15: '25rem',
                16: '32rem',
                72: '216rem',
                84: '252rem',
                96: '288rem',
            },
        },
        fontSize: {
            '3xs': ['0.8rem', '0.8rem'],
            '2xs': ['0.9rem', '0.9rem'],
            'xs': ['1rem', '1rem'], // 标准字号
            'sm': ['1.1rem', '1.1rem'],
            'tiny': ['1.2rem', '1.2rem'],
            'base': ['1.4rem', '1.4rem'],
            'lg': ['1.6rem', '1.6rem'],
            'xl':['1.8rem', '1.8rem'],
            '1xl': ['2.2rem', '2.2rem'],
            '2xl': ['2.7rem', '2.7rem'],
            '3xl': ['3.6rem', '3.6rem'],
            '4xl': ['4.8rem', '4.8rem'],
            '5xl': ['6.0rem', '6.0rem'],
            '6xl': ['7.2rem', '7.2rem'],
            '7xl': ['9.0rem', '9.0rem'],
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
        transitionDuration:{ 100: '0ms', 200: '0ms' },
    },
    // Extend Tailwind theme
    variants: {
        extend: {
            backgroundColor: ['active'],
        },
    },
    colors: {
        primary: colors.trueGray[500],
        secondary: '#009688',
        error: colors.red[600],
        success: '#4caf50',
        alert: colors.blue[300],
        blue: '#2196f3',
        dark: '#212121',
    },
    darkMode: true,
};