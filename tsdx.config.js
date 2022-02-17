const postcss = require('rollup-plugin-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
  rollup(config, options) {
    config.plugins.push(
      postcss({
        plugins: [
          autoprefixer(),
          cssnano({
            preset: 'default',
          }),
        ],
        // modules: true,
        // camelCase:true,
        inject: true,
        // extract: 'react-lazy-image.min.css',
        // extensions: ['.less'],
      })
    );
    return config;
  },
};
