module.exports = {
	url: '/help/contact',
	title: 'Contact us',
	description: 'Contact info',
	template: 'oneColumnReadingWidth',
	content: [
		{
			type: 'html',
			value: '<p>You can reach us at enquiries@example.com.</p>',
		},
		{
			type: 'feed',
			value: 'https://example.com/rss',
			style: 'minimal',
			opts: {
				maxPosts: 10,
				cacheHours: 24,
			}
		}
	]
};
