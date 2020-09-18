const _ = require('lodash');
const axios = require('axios');
const { makeStringUrlFriendly } = require('../../../lib/utils');

/**
 * Data about the journals
 *
 * There's only one journal to support in this case
 * so a static definition works well here
 */
const journalsData = [
  {
		id: 'elife',
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

/**
 * Generic content item mapper
 * Transforms eLife content items to the standard OPP format
 */
function mapResultToOPP(res) {
  const rtn = res && res.item ? res.item : res;
  rtn.journalId = 'elife';
  rtn.url = `/journals/${rtn.journalId}/article/${res.id}/${makeStringUrlFriendly(res.title)}`
  rtn.img = _.get(res, 'image.source.uri');
  return rtn;
}

/**
 * Get one article
 */
async function getOneArticle(articleId) {
  const fullUrl = `https://prod--gateway.elifesciences.org/articles/${articleId}`;
  return axios.get(fullUrl)
    .then(function (response) {
      return { data: response.data };
    })
    .catch(function (error) {
      console.log(error);
      return { error: 'BFF had a problem resolving data from an external API' }
    });
}

/**
 * Get all journals
 */
async function getAllJournals() {
  return new Promise(resolve => {
    resolve({ data: journalsData });
  });
}

/**
 * Get one journal
 */
async function getOneJournal(journalId) {
  return new Promise(resolve => {
    resolve({ data: journalsData[0] });
  });
}

/**
 * Get current issue of the journal
 */
async function getCurrentIssue() {
  const fullUrl = `https://prod--gateway.elifesciences.org/covers/current`;

  return axios.get(fullUrl)
    .then(function (response) {
      const mappedResults = response.data.items.map(mapResultToOPP);

      const finalResponse = {
        data: {
          total: response.data.total,
          results: mappedResults,
        },
      }

      return finalResponse;
    })
    .catch(function (error) {
      console.log(error);
      return { error: 'BFF had a problem resolving data from an external API' }
    });
}

/**
 * Execute a content search
 *
 * Example params supported by eLife's public API
 *   for=covid
 *   page=4
 *   per-page=10
 *   sort=relevance
 *   order=desc
 *   subject[]=cell-biology
 *   start-date=2010-01-01
 *   end-date=2020-12-31
 */
function search({ phrase, pageNumber, pageSize }) {
  let fullUrl = `https://prod--gateway.elifesciences.org/search?`;
  if (phrase) {
    fullUrl += `for=${phrase}&`;
  }
  if (pageNumber) {
    fullUrl += `page=${pageNumber}&`;
  }
  if (pageSize) {
    fullUrl += `per-page=${pageSize}&`;
  }

  return axios.get(fullUrl)
    .then(function (response) {
      const mappedResults = response.data.items.map(mapResultToOPP);

      const finalResponse = {
        error: null,
        info: {
          requestProcessingMs: 324,
          requestWaitingMs: 324,
        },
        data: {
          total: response.data.total,
          pages: {
            pageNumber: pageNumber,
            pageSize: pageSize,
            totalPages: Math.ceil(response.data.total / pageSize),
          },
          query: {
            phrase,
            // filters
          },
          results: mappedResults,
          aggs: {
            types: response.data.types,
            subjects: response.data.subjects,
          }
        },
      }

      return finalResponse;
    })
    .catch(function (error) {
      console.log(error);
      return { error: 'BFF had a problem resolving data from an external API' }
    });
}

const eLifeAdapter = {
  getOneJournal,
  getAllJournals,
  getOneArticle,

  getCurrentIssue,
  search,
};

module.exports = eLifeAdapter;
