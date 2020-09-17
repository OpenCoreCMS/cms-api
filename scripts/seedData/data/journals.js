module.exports = [
	{
		id: 'eLife',
		name: 'eLife Sciences',
		publisher: {
			name: 'eLife Sciences Publications Ltd',
			url: 'https://elifesciences.org/'
		},
		description: `eLife is a selective, not for profit peer-reviewed open access scientific journal for the biomedical and life sciences.<br />It was established at the end of 2012 by the Howard Hughes Medical Institute, Max Planck Society, and Wellcome Trust, following a workshop held in 2010 at the Janelia Farm Research Campus.`,
		editorialBoard: [{
			role: 'chief-editor',
			name: 'Michael Eisen'
		}],
		indexing: {
			mnemonic: 'eLife',
			iso4: 'eLife', // ISO4 abbreviation
			// doi: '10.0000/0000',
			// issnPrint: '0000-0000',
			issnOnline: '2050-084X',
			coden: 'ELIFA8',
			oclc: '813236730',
		},
		links: {
			researchgate: 'https://www.researchgate.net/journal/2050-084X_eLife_Sciences'
		},
		frequency: 'continuous',
		openAccess: 'full',
		impactFactor: {
			score: '7.080',
			year: 2019
		},
		history: {
			startDate: 2012
		},
		disciplines: ['biomedicine', 'life sciences']
	}
];
