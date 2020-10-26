module.exports = function(eleventyConfig) {
	eleventyConfig.addPassthroughCopy('src/images');
	eleventyConfig.addPassthroughCopy('src/scripts');
	eleventyConfig.addPassthroughCopy('src/styles');

	return {
		dir: { input: 'src', output: '_site', data: '_data' },
		passthroughFileCopy: true,
		templateFormats: ['njk', 'md', 'css', 'html', 'yml'],
		htmlTemplateEngine: 'njk'
	}
};