const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProduction = (mode) => mode === "production";

module.exports = (env, argv) => ({
  mode: process.env.NODE_ENV || "development",
  entry: path.resolve(__dirname, "src/index.tsx"),
  devtool: "inline-source-map",
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, "public"),
    compress: true,
    port: 8080,
    host: "0.0.0.0",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: isProduction(argv.mode)
        ? "[name].[contenthash].css"
        : "[name].css",
      chunkFilename: isProduction(argv.mode)
        ? "[id].[contenthash].css"
        : "[id].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          configFile: "tsconfig.json",
        },
      },
      {
        test: /\.(sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: process.env.NODE_ENV === "development",
            },
          },
          {
            loader: "css-loader",
            options: {
              modules: {
                mode: "local",
                localIdentName: isProduction(argv.mode)
                  ? "[contenthash:base64:5]"
                  : "[name]_[local]-[contenthash:base64:5]",
                localIdentContext: path.resolve(__dirname, "src"),
                exportLocalsConvention: "camelCase",
              },
              sourceMap: !isProduction(argv.mode),
              importLoaders: 1,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                ident: "postcss",
                plugins: [require("autoprefixer")],
              },
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  resolve: {
    alias: {
      styles: path.resolve(__dirname, "src/styles"),
    },
    extensions: [".tsx", ".ts", ".js", ".css", ".scss"],
  },
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "public"),
    publicPath: "/",
  },
});
