const axios = require('axios');
const MongoLib = require('../../../lib/mongo');
const { makeStringUrlFriendly } = require('../../../lib/utils');

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

async function getAllJournals() {
  return new Promise(resolve => {
    MongoLib.journals.find({}, (allJournalsErr, allJournalsData) => {
      resolve({ data: allJournalsData });
    });
  });
}

async function getOneJournal(journalId) {
  return new Promise(resolve => {
    MongoLib.journals.find({}, (allJournalsErr, allJournalsData) => {
      resolve({ data: allJournalsData[0] });
    });
  });
}

async function getCurrentIssue() {
  const fullUrl = `https://prod--gateway.elifesciences.org/covers/current`;

  return axios.get(fullUrl)
    .then(function (response) {
      const results = response.data.items.map((res) => {
        const rtn = res.item;
        rtn.url = `/journals/eLife/article/${rtn.id}/${makeStringUrlFriendly(rtn.title)}`
        rtn.img = res.image.source.uri;
        return rtn;
      });

      const finalResponse = {
        data: {
          total: response.data.total,
          results: results,
        },
      }

      return finalResponse;
      // return { data: response.data };
    })
    .catch(function (error) {
      console.log(error);
      return { error: 'BFF had a problem resolving data from an external API' }
    });
}

// https://prod--gateway.elifesciences.org/search
//         ?for=covid
//
//         &page=4
//         &per-page=10
//
//         &sort=relevance
//         &order=desc
//
//         &subject[]=cell-biology
//
//         &start-date=2010-01-01
//         &end-date=2020-12-31
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
          results: response.data.items,
          aggs: {
            types: response.data.types,
            subjects: response.data.subjects,
          }
        },
      }

      finalResponse.data.results = finalResponse.data.results.map((res) => {
        res.url = `/journals/eLife/article/${res.id}/${res.title}`
        return res;
      })

      return finalResponse;
      // return { data: response.data };
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
