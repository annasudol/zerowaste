const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#38C172",
              "@link-color": "#FFF",
              "@border-radius-base": "2px",
              "@btn-primary-bg": "#339B60",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};