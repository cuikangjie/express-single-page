const webpack = require('webpack');
const path = require('path')
const glob = require('glob')
const nodeExternals = require('webpack-node-externals')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const resolve = file => path.resolve(__dirname, file)
let isProd = false
if (process.argv.includes('--release')) {
  isProd = true
}

// view
const viewConfig = {
  entry: path.resolve(__dirname, '../src/view/main.js'),
  output: {
    path: path.resolve(__dirname, '../build/view'),
    publicPath: '/view/',
    filename: '[name].[chunkhash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.css$/,
        use: isProd
          ? ExtractTextPlugin.extract({
              use: 'css-loader?minimize',
              fallback: 'vue-style-loader'
            })
          : ['vue-style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  performance: {
    hints: false
  },
  devtool: isProd ? false : '#eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': !isProd ? '"development"' : '"production"',
      __DEV__: !isProd
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, '../template/index.html'),
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
        minifyURLs: true,
      },
    }),
  ]
}


// node
let nodeConfig = {
  entry: {
    app: ["babel-polyfill", path.resolve(__dirname, '../src/app.js')]
  },
  target: 'node',
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    modules: ['node_modules', 'src']
  },
 externals: [nodeExternals({importType:'commonjs',whitelist:[]})],
  node: {
    console: true,
    global: true,
    process: true,
    Buffer: true,
    __filename: false,
    __dirname: false,
    setImmediate: true
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }]
  },
  plugins: [
    ...(!isProd ? [] : [
      new webpack.optimize.UglifyJsPlugin(),
    ]),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': !isProd ? '"development"' : '"production"',
      __DEV__: !isProd
    })
  ]
};
if (isProd) {
  nodeConfig.entry.start = path.resolve(__dirname, '../pm2/index.js')
}

module.exports = {
  nodeConfig,
  viewConfig
}
