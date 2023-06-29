const {
  defineConfig
} = require('@vue/cli-service')
var webpack = require('webpack');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    //代理的目标地址
    proxy: {
      '/api': {
        // 后端地址，注意要加上/api
        target: 'http://127.0.0.1:3007/api',
        //设置同源
        changeOrigin: true,
        //路径重写
        pathRewrite: {
          '^/api': ''
        }
      },
    },
  },
})