const colors = require('tailwindcss/colors');

module.exports = {
    theme: {
        extend: {
            spacing: {
                72: '18rem',
                84: '21rem',
                96: '24rem',
            },
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