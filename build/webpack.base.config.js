const path = require("path");
const nodeExternals = require("webpack-node-externals");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

module.exports = env => {
  return {
    target: "node",
    node: {
      __dirname: false,
      __filename: false
    },
    externals: [nodeExternals()],
    resolve: {
      alias: {
        env: path.resolve(__dirname, `../config/env_${env}.json`)
      },
      extensions: ['.js', '.jsx'],
    },
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            require.resolve('style-loader'),
            {
              loader: require.resolve('css-loader'),
              query: {
                sourceMap: true,
                modules: false,
                importLoaders: 1,
              }
            },
            {
              loader: require.resolve('sass-loader')
            }
          ]
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader"]
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        }
      ]
    },
    plugins: [
      new FriendlyErrorsWebpackPlugin({ clearConsole: env === "development" })
    ]
  };
};
