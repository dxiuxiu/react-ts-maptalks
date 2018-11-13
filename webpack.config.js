const path = require("path");

const isProduction = process.env.NODE_ENV === 'production'

const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const webpack = require('webpack')

const ProgressBarPlugin = require('progress-bar-webpack-plugin')

const HappyPack = require('happypack')

const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')

// `CheckerPlugin` is optional. Use it if you want async error reporting.
// We need this plugin to detect a `--watch` mode. It may be removed later
// after https://github.com/webpack/webpack/issues/3460 will be resolved.
const {
  CheckerPlugin
} = require('awesome-typescript-loader')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: isProduction ? 'production' : 'development', // [webpack-mode](https://webpack.js.org/concepts/mode/)
  entry: {
    index: ["./src/index.tsx"], //入口文件，若不配置webpack4将自动查找src目录下的index.js文件
  },
  output: {
    filename: "js/[name].bundle.js", //输出文件名，[name]表示入口文件js名
    path: path.resolve(__dirname, 'build/dist/'), // 输出路径
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", "jsx"],
    alias: {
      '@components': path.resolve(__dirname, './src/components'), // 该节点的作用是可以使组件导入时使用简单路径,和tsconfig.json的path配置节点结合使用
    }
  },
  devtool: isProduction ? 'cheap-module-source-map' : 'cheap-module-eval-source-map',

  // devServer节点下的内容是由包webpack-dev-server支持的，所以在使用时需要确定webpack-dev-server已安装
  devServer: {

    // publicPath: '/dist/',
    // inline:true,
    host: 'localhost', // 指定主机，默认即为：localhost
    hot: true, // 热刷新，似乎记得启用热模块替换功能(HMR)必须该节点为true
    historyApiFallback: true, // 路由错误会返回到index页面
    noInfo: false, // 为true启用，启用在启动项目和启用后在启动后的每一次保存的打包详细信息会被隐藏，包括项目运行在哪里等等，建议使用false
    open: true, // 该属性配置为true后会在devServer启动成功后自动将页面在浏览器中打开
    overlay: { // 添加该节点即可实现错误和警告全屏显示在浏览器窗口
      warnings: true,
      errors: true
    },

    // 代理，访问后台服务时用到
    proxy: {

    },
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30000, // 模块大于30k会被抽离到公共模块
      minChunks: 1, // 模块出现1次就会被抽离到公共模块
      maxAsyncRequests: 5, // 异步模块，一次最多只能被加载5个
      maxInitialRequests: 3, // 入口模块最多只能加载3个
      name: true,
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
          name: 'default'
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: 'vendors'
        }
      }
    },
    // 这个配置节点会多拆分出一个runtime.bundle.js文件
    runtimeChunk: {
      name: 'runtime'
    }
  },
  module: {
    rules: [{
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader"
      },
      {
        test: /\.(le|sa|sc|c)ss$/,
        use: [
          'css-hot-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              // modules: true,
              localIdentName: '[local]_[hash:base64:6]',
              minimize: isProduction
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: !isProduction,
              ident: 'postcss'
            }
          },
          {
            loader: 'resolve-url-loader'
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
              sourceMap: !isProduction
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|otf|woff(2)?)(\?[\s\S]+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'fonts/[hash:6].[ext]'
          }
        }]
      },
      {
        test: /\.(png|jpg|gif|svg|ico|cur)(\?[=a-z0-9]+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            // limit为1024时，在使用maptalks时发现marker的inforWindow的尖尖图标和关闭图标出不来，修改为8129后就出来了
            limit: 8192, // 如果文件小于1024则直接处理为base64在代码中，如果大于1024则使用file-loader处理，将以文件的形式放到到指定文件夹下
            name: 'images/[hash:6].[ext]',
            fallback: 'file-loader', // 默认为file-loader

            publicPath: './'
          }
        }]
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        // 排除node_modules 目录下的文件
        exclude: /node_modules/,
        // 把对.js 的文件处理交给id为babel 的HappyPack 的实例执行
        use: [
          'happypack/loader?id=babel'
        ]
      }
    ]
  },
  // plugins: [
  //   new CheckerPlugin(),
  //   new webpack.HotModuleReplacementPlugin()
  // ]
  plugins: [
    // 生产环境和开发环境都要用到的插件
    new CheckerPlugin(),
    new ProgressBarPlugin({
      format: 'build [:bar] :percent (:elapsed seconds)',
      clear: false,
      width: 60
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new MiniCssExtractPlugin({
      filename: "style/[name].css", //输出文件名，[name]表示入口文件js名
      path: path.resolve(__dirname, 'build/dist/'), // 输出路径
    })
  ].concat(!isProduction ?
    // 非生产环境即开发环境要用的插件
    new webpack.HotModuleReplacementPlugin() :
    // 生产环境要用到的插件
    new CleanWebpackPlugin('./build'),

    new WebpackParallelUglifyPlugin({
      uglifyES: {
        mangle: false,
        output: {
          beautify: false,
          comments: false
        },
        compress: {
          warnings: false,
          drop_console: true,
          collapse_vars: true,
          reduce_vars: true
        }
      }
    }),
    new HappyPack({
      // 用id来标识 babel 处理的那类文件 ，这里的id和上面loader中的id相对应
      id: 'babel',
      // 代表开启几个子进程去处理这一类型的文件，默认是3个，类型必须是整数。
      threads: 4,
      loaders: ['babel-loader'], // Array 用法和 webpack Loader 配置中一样.
      // 实测threadPool设置会导致报错：HappyThreadPool不存在
      // threadPool: HappyThreadPool, // 代表共享进程池，即多个 HappyPack 实例都使用同一个共享进程池中的子进程去处理任务，以防止资源占用过多。
      debug: false, // Boolean 是否启用debug 用于故障排查。默认 false。
      verbose: true // Boolean 是否允许 HappyPack 输出日志，默认是 true。
    }),

    new HtmlWebpackPlugin({ // 参考Summit Web版
      title: 'demo1',
      hash: true,
      filename: './index.html', // 决定自动生成的html页面位置

      // 没有这个时bulid之后live报错Minified React error #200; visit https://reactjs.org/docs/error-decoder.html?invariant=200 for the full message or use the non-minified dev environment for full errors and additional helpful warnings. 
      // 经验证发现出错的根本原因是自动生成的html页面没有节点 <div id="root"></div>
      template: './public/template.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      chunksSortMode: 'none',
      cache: true
    })
  )
}