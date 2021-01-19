const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/main/index.tsx',
  output: {
    path: path.join(__dirname, 'public/js'),
    publicPath: '/public/js',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@domain/*': path.join(__dirname, 'src/domain/*'),
      '@data/*': path.join(__dirname, 'src/data/*'),
      '@infra/*': path.join(__dirname, 'src/infra/*')
    }
  },
  devServer: {
    contentBase: './public',
    writeToDisk: true,
    historyApiFallback: true
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDom'
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
}