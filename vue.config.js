module.exports = {
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'development') {
      config
        .output
        .filename('[name].[hash].js')
        .end()
    }
  },
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true
    }
  },
  runtimeCompiler: true
}