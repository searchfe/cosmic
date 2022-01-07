module.exports = {
    plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
        require('postcss-modules')({
            getJSON() {},
            generateScopedName(name, filename, css) {
                if (filename.endsWith('.module.css')) {
                    return require('postcss-modules/build/generateScopedName').default(name, filename, css);
                }
                return name;
            },
        }),
    ],
};
