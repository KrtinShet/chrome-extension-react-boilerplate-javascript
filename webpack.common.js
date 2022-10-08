const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const getHtmlPlugins = (filenames) =>
  filenames.map(
    (file) =>
      new HtmlWebpackPlugin({
        filename: `${file}.html`,
        chunks: [file],
        cache: false,
      })
  );

module.exports = {
  entry: {
    background: path.resolve("src/scripts/background/index.js"),
    contentscript: path.resolve("src/scripts/content/index.js"),
    popup: path.resolve("src/Popup/index.js"),
  },
  module: {
    rules: [
      {
        use: ["style-loader", "css-loader"],
        test: /\.css?$/,
        exclude: /node_modules/,
      },
      {
        test: /\.jsx|.js|.m?js?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve("src/public"),
          to: path.resolve("dist"),
        },
      ],
    }),
    ...getHtmlPlugins(["popup"]),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js", "jsx"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve("dist"),
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};
