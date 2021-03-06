import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import replace from 'rollup-plugin-replace';

export default {
	entry: 'jsx/index.jsx',
	dest: 'app/static/js/bundle.js',
	format: 'iife',
	sourceMap: 'inline',
	plugins: [
		resolve({
			jsnext: true,
			main: true,
			browser: true,
		}),
		commonjs({
			namedExports: {
				'node_modules/react/react.js': [ 'Component', 'PropTypes' ]
			}
		}),
		eslint(),
		babel({
			exclude: 'node_modules/**',
		}),
		(process.env.NODE_ENV === 'production' && uglify()),
		replace({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
		}),
	],
};
