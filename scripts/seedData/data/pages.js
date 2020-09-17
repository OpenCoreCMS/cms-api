module.exports = [
	{
		url: '/help/about',
		title: 'About OPP Demo Platform',
		description: 'OPP Demo Platform brings together Open Access content to show an example use case of the Open Publishing Platform.',
		template: 'oneColumnReadingWidth',
		content: [
			{
				type: 'html',
				value: '<div>Open Publishing Platform is an open-source solution to digital presence of publishers big and small.</div>',
			},
		]
	},

	{
		url: '/help/contact-us',
		title: 'Contact us',
		description: 'Contact info',
		template: 'oneColumnReadingWidth',
		content: [
			{
				type: 'html',
				value: '<p>You can reach us at enquiries@example.com.</p>',
			},
		]
	},

	{
		url: '/legal/accessibility',
		title: 'Accessibility',
		description: 'Accessibility statement',
		template: 'oneColumnReadingWidth',
		content: [
			{
				type: 'html',
				value: '<p>This platform aims to be very accessible.</p>',
			},
		]
	},

	{
		url: '/legal/privacy-policy',
		title: 'Privacy Policy',
		description: 'Privacy Policy',
		template: 'oneColumnReadingWidth',
		content: [
			{
				type: 'html',
				value: '<p>Lorem ipsum.</p>',
			},
		]
	},

	{
		url: '/legal/terms-of-use',
		title: 'Terms of Use',
		description: 'Terms of Use',
		template: 'oneColumnReadingWidth',
		content: [
			{
				type: 'html',
				value: '<p>Lorem ipsum.</p>',
			},
		]
	},

	{
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
	}
];
