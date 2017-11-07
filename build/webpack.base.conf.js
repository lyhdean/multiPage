/******
从代码中看到，dev-server使用的webpack配置来自build/webpack.dev.conf.js文件（测试环境下使用的是build/webpack.prod.conf.js，这里暂时不考虑测试环境）。
而build/webpack.dev.conf.js中又引用了webpack.base.conf.js，所以这里我先分析webpack.base.conf.js。

webpack.base.conf.js主要完成了下面这些事情：

配置webpack编译入口
配置webpack输出路径和命名规则
配置模块resolve规则
配置不同类型模块的处理规则
说明： 这个配置里面只配置了.js、.vue、图片、字体等几类文件的处理规则，如果需要处理其他文件可以在module.rules里面另行配置。
*******/

'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')


var webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
var glob  = require('glob')
var entriesother = getEntry('./src/pages/**/index.js'); // 获得入口js文件
var entries = Object.assign({
    app: './src/main.js'
}, entriesother);
console.log(entries);
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  // webpack入口文件
  entry:entries,
  // webpack输出路径和命名规则
  output: {
    // webpack输出的目标文件夹路径（例如：/dist）
    path: config.build.assetsRoot,
    filename: '[name].js',// webpack输出bundle文件命名格式
     // webpack编译输出的发布路径（例如'//cdn.xxx.com/app/'）
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
    plugins: [
    //提取公共代码
    /* new webpack.optimize.CommonsChunkPlugin({
            name: ['chunk'],
            chunks: [],
            minChunks: 2
        }),*/   //对象方式传参，name不要.js后缀
      //new webpack.optimize.CommonsChunkPlugin('chunk.js'),
  ],
   // 模块resolve的规则
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    // 别名，方便引用模块，例如有了别名之后，
    // import Vue from 'vue/dist/vue.common.js'可以写成 import Vue from 'vue'
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  // 不同类型模块的处理规则
  module: {
    rules: [
      // 对src和test文件夹下的.js和.vue文件使用eslint-loader进行代码规范检查
     /* {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },*/
      {// 对所有.vue文件使用vue-loader进行编译
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {// 对src和test文件夹下的.js文件使用babel-loader将es6+的代码转成es5
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {// 对图片资源文件使用url-loader
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,// 小于10K的图片转成base64编码的dataURL字符串写到代码中
          name: utils.assetsPath('img/[name].[hash:7].[ext]')// 其他的图片转移到静态资源文件夹
        }
      },
      {// 对多媒体资源文件使用url-loader
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000, // 小于10K的资源转成base64编码的dataURL字符串写到代码中
          name: utils.assetsPath('media/[name].[hash:7].[ext]')// 其他的资源转移到静态资源文件夹
        }
      },
     /* {// 对字体资源文件使用url-loader
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,// 小于10K的资源转成base64编码的dataURL字符串写到代码中
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')// 其他的资源转移到静态资源文件夹
        }
      }*/
    ]
  }
}

function getEntry(globPath) {
  var entries = {},
    basename, tmp, pathname;
  /*if (typeof (globPath) != "object") {
    globPath = [globPath]
  }*/
    glob.sync(globPath).forEach(function (entry) {
        basename = path.basename(entry, path.extname(entry));      
        tmp = entry.split('/').splice(-3);
        pathname = tmp.splice(1, 1); // 正确输出js和html的路径
        entries[pathname] = entry;
    });
  return entries;
}

var pages = getEntry('./src/pages/**/index.html');
for (var pathname in pages) {
  // 配置生成的html文件，定义路径等
  var conf = {
    filename: pathname + '.html',
    template: pages[pathname],   // 模板路径
    inject: true,              // js插入位置
    chunks: [pathname], // 每个html引用的js模块
    // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    chunksSortMode: 'dependency'

  };

  module.exports.plugins.push(new HtmlWebpackPlugin(conf));
}