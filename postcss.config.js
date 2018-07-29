module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-apply'),
    require('postcss-nested'),
    require('precss'),
    require('postcss-assets')({
      "basePath": "src/client/",
      "cachebuster": true,
      "relative": true
    }),
    require('postcss-cssnext'),
    require('postcss-hexrgba'),
    require('postcss-reporter')
  ]
}
