const pluginRss = require("@11ty/eleventy-plugin-rss");
const { DateTime } = require("luxon");
 
module.exports = function(eleventyConfig) {
	eleventyConfig.addPlugin(pluginRss);
};

module.exports = function(eleventyConfig) {
	eleventyConfig.addPassthroughCopy('src/images');
	eleventyConfig.addPassthroughCopy('src/scripts');
	eleventyConfig.addPassthroughCopy('src/styles');

	eleventyConfig.addFilter('htmlDateString', (dateObj) => {
		return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
	});

	return {
		dir: { input: 'src', output: '_site', data: '_data' },
		passthroughFileCopy: true,
		templateFormats: ['njk', 'md', 'css', 'html', 'yml'],
		htmlTemplateEngine: 'njk'
	}
};