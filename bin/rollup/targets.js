const defaultFormats = ['iife', 'umd', 'amd'];

const target = (outputPath, format, minify) => ({
	file: `${outputPath}.${format}${minify ? '.min' : ''}.js`,
	format,
});

module.exports = (env, output, formats) => {
	formats = typeof formats === 'string' ? [formats] : formats;
	formats = Array.isArray(formats) ? formats : defaultFormats;
	return formats.map(format => target(output, format, env.MINIFY));
};
