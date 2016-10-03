var path = require("path");
var webpack = require('webpack');
<% if (postCss&&!!~postCss.plugins.indexOf('autoprefixer')) { %>
var autoprefixer = require('autoprefixer')({browsers: [
    '> 1%',
    'ie >= 9'
]});
<% } %>
<% if (postCss&&!!~postCss.plugins.indexOf('nested')) { %>
var postcssnested = require('postcss-nested');
<% } %>
<% if (postCss&&!!~postCss.plugins.indexOf('nested')) { %>
var postcssFor = require('postcss-for');
<% } %>
module.exports = {
  entry: {
    app: ["./src/<%= packageName %>.js"]
  },
  module: {
  	loaders: [
	  		{
		        test: /\.js[x]?$/,
		        // exclude: /node_modules/,
		        loader: "babel-loader",
		        query: {
		            compact: false,
		            presets: require.resolve('babel-preset-es2015'),
		            plugins: [require.resolve("babel-plugin-transform-react-jsx"),require.resolve("babel-plugin-add-module-exports")]
		        }
		    },
        {
          test: /\.scss$/,
          loaders: ["style", "css", "sass"]
        },
        { test: /\.css$/, loader: "style-loader!css-loader!postcss-loader" }

	    ]
	},
  plugins: [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV||'development')
    })
  ],
  postcss: function () {
      return [autoprefixer, postcssnested, postcssFor];
  },
	output: {
		path: path.resolve(__dirname, "./dist"),
		publicPath: "/",
		filename: "bundle.js",
		libraryTarget: 'umd',
		library: '<%= packageName %>'
	}
};
