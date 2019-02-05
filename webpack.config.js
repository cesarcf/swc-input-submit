const path = require('path');

module.exports = {
	target: 'web',
	entry: './swc-input-submit.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'build.js'
	}
}