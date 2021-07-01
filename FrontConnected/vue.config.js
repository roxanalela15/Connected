module.exports = {
    devServer: {
      host: 'localhost',
    },
    pluginOptions: {
      electronBuilder: {
          nodeIntegration: true
      }
  },
  module: {
    rules: [
    {
    test: /.node$/,
    use: 'node-loader'
    }
    ]
    }
  };

