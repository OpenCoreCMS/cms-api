module.exports = {
	url: '/demopage',
	title: 'Components demo page',
	description: 'Components demo page',
	template: 'oneColumnReadingWidth',
	content: [
		{
			type: 'html',
			value: '<p>Some HTML content.</p>',
		},
		{
			type: 'feed',
			value: 'https://example.com/rss',
			style: 'minimal',
			opts: {
				maxPosts: 10,
				cacheHours: 24,
			}
		},
		{
			type: 'carousel',
			value: [
				'https://images.dog.ceo/breeds/frise-bichon/stevebaxter_bichon_frise.jpg',
				'https://images.dog.ceo/breeds/boxer/n02108089_5266.jpg',
				'https://images.dog.ceo/breeds/cairn/n02096177_2020.jpg',
				'https://images.dog.ceo/breeds/spaniel-cocker/n02102318_6213.jpg',
				'https://images.dog.ceo/breeds/akita/512px-Akita_inu.jpeg',
				'https://images.dog.ceo/breeds/setter-irish/n02100877_1669.jpg',
			],
			style: 'minimal',
			opts: {
				slideDisplayTime: 10,
				transitionTime: 3
			}
		},
	]
};
