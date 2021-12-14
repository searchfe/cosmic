module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-url'),
    require('postcss-input-range'),
    require('autoprefixer'),
    require('tailwindcss')(
      require('smelte/tailwind.config')(require('../../tailwind.config.cjs')),
    ),
  ],
};
