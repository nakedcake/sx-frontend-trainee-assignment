const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

require("custom-env").env(process.env.NODE_ENV);

module.exports = {
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "[name].bundle.js",
    publicPath: "/",
    clean: true,
  },
  devtool: "inline-source-map",
  devServer: {
    port: process.env.APP_PORT,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[local]__[hash:base64:5]",
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ["", ".js", ".jsx"],
  },
  plugins: [
    new webpack.EnvironmentPlugin([
      "API_HOST",
      "API_PORT",
      "APP_PORT",
      "STORIES_LIST_LIMIT",
      "API_REFRESH_TIMEOUT_MILLISECONDS",
    ]),
    new HtmlWebpackPlugin({ template: "./src/index.html", inject: "body" }),
  ],
};
