const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const lessPath = path.resolve(__dirname + '/src/styles/cover.less')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          //'cell-font-size': '50px',
          //或通过less文件覆盖（文件路径为绝对路径）
          hack: `true; @import "${lessPath}";`,
        },
      },
    },
  },
})
