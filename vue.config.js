const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const nodeExternals = require('webpack-node-externals')
const merge = require('lodash.merge')
const TARGET_NODE = process.env.WEBPACK_TARGET === 'node'
const target = TARGET_NODE ? 'server' : 'client'
const isDev = process.env.NODE_ENV !== 'production'

const path = require('path')
function resolve(dir) {
  // 此处使用path.resolve 或path.join 可自行调整
  return path.join(__dirname, dir)
}

module.exports = {
  // baseUrl: isDev ? 'http://127.0.0.1:8082' : 'http://127.0.0.1:3000',
  // Vue CLI 会假设你的应用是被部署在一个域名的根路径上，例如 https://www.my-app.com/。
  // 如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。
  // 例如，如果你的应用被部署在 https://www.my-app.com/my-app/，则设置 publicPath 为 /my-app/。
  publicPath: isDev ? '/' : '/',

  devServer: {
    port: 8889,
    historyApiFallback: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
          // '^/w': '/w'
        }
      }
    }

  },
  css: {
    extract: false,
    loaderOptions: {
      postcss: {
        plugins: [
          require('autoprefixer')({}),
          require('postcss-plugin-px2rem')({
            rootValue: 75,
            unitPrecision: 5,
            // exclude: /(node_module)/i,
            mediaQuery: false,
            minPixelValue: 3,
            propBlackList: ['border']
          })
        ]
      }
    }
  },

  configureWebpack: () => ({
    // 将 entry 指向应用程序的 server / client 文件
    entry: `./src/entry-${target}.js`,
    // 对 bundle renderer 提供 source map 支持
    devtool: 'source-map',
    target: TARGET_NODE ? 'node' : 'web',
    node: TARGET_NODE ? undefined : false,
    output: {
      libraryTarget: TARGET_NODE ? 'commonjs2' : undefined
    },
    // https://webpack.js.org/configuration/externals/#function
    // https://github.com/liady/webpack-node-externals
    // 外置化应用程序依赖模块。可以使服务器构建速度更快，
    // 并生成较小的 bundle 文件。
    externals: TARGET_NODE
      ? nodeExternals({
        // 不要外置化 webpack 需要处理的依赖模块。
        // 你可以在这里添加更多的文件类型。例如，未处理 *.vue 原始文件，
        // 你还应该将修改 `global`（例如 polyfill）的依赖模块列入白名单
        whitelist: [/\.css$/]
      })
      : undefined,
    optimization: {
      splitChunks: TARGET_NODE ? false : undefined
    },
    plugins: [TARGET_NODE ? new VueSSRServerPlugin() : new VueSSRClientPlugin()]
  }),

  chainWebpack: config => {
    config.resolve.alias
      // key,value自行定义，比如.set('@assets', resolve('src/assets'))
      .set('@', resolve('src'))
      .set('@router', resolve('src/router'))
      .set('@api', resolve('src/model/api'))
      .set('@views', resolve('src/views'))
      .set('@assets', resolve('src/assets'))
      .set('@store', resolve('src/store'))
      .set('@common', resolve('src/components/common'))
      .set('@mockdatas', resolve('mockdatas'))
      .set('@server', resolve('server'))

    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => {
        return merge(options, {
          optimizeSSR: false
        })
      })

    // fix ssr hot update bug
    if (TARGET_NODE) {
      config.plugins.delete('hmr')
    }
  },

  pluginOptions: {}
}
