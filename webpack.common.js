const path = require('path');  // 路径处理模块
const webpack = require('webpack');  // 这个插件不需要安装，是基于webpack的，需要引入webpack模块
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 引入HtmlWebpackPlugin插件

module.exports = {
  // entry: path.join(__dirname, "/src/index.js"), // 入口文件
  entry: {//多入口写成对象
    index: path.join(__dirname, "/src/index.js"),
    two: path.join(__dirname, "/src/two.js")
  },
  output: {
    path: path.join( __dirname, "/dist"), //打包后的文件存放的地方
    // filename: "bundle.js" //打包后输出文件的文件名
    filename: "[name].js" //多出口:打包后输出文件的文件名
  },
  module: {
    rules: [
      {
        test: /\.css$/,   // 正则匹配以.css结尾的文件
        // use: ['style-loader', 'css-loader']  // 需要用的loader，一定是这个顺序，因为调用loader是从右往左编译的
        use: [
          {loader: "style-loader"},
          {loader: "css-loader"},
          {loader: "postcss-loader"},
        ]
      },
      {
        test: /\.(scss|sass)$/,   // 正则匹配以.scss和.sass结尾的文件
        use: ['style-loader', 'css-loader', 'sass-loader']  // 需要用的loader，一定是这个顺序，因为调用loader是从右往左编译的
      },
      {
        test: /\.(png|jpg|svg|gif)$/,  // 正则匹配图片格式名
        use: [
          {
            loader: 'url-loader',  // 使用url-loader
            options: {
              limit: 1000, // 限制只有小于1kb的图片才转为base64，例子图片为1.47kb,所以不会被转化
              outputPath: 'images'  // 设置打包后图片存放的文件夹名称
            }
          }
        ]
      },
      {                             // jsx配置
        test: /(\.jsx|\.js)$/,
        use: {                    // 注意use选择如果有多项配置，可写成这种对象形式
          loader: "babel-loader",
          // options: {     //注释掉了: 已转到.babelrc文件下,webpack会自动调用该文件
          //   presets: [
          //     "env", "react"
          //   ]
          // }
        },
        exclude: /node_modules/   // 排除匹配node_modules模块
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin('版权所有，翻版必究'),  // new一个插件的实例
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "/src/index.template.html")// new一个这个插件的实例，并传入相关的参数
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}
