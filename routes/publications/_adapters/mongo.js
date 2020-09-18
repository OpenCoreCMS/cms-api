const MongoLib = require('../../../lib/mongo');
const { makeStringUrlFriendly } = require('../../../lib/utils');

async function getOneArticle(articleId) {
  return new Promise(resolve => {
    MongoLib.articles.find({ id: articleId }, (articleErr, articleData) => {
      resolve({ data: articleData[0] });
    });
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
    MongoLib.journals.find({ id: journalId }, (allJournalsErr, allJournalsData) => {
      resolve({ data: allJournalsData[0] });
    });
  });
}

async function getCurrentIssue() {
  return new Promise(resolve => {
    MongoLib.articles.find({}, (articleErr, articleData) => {
      resolve({ data: articleData });
    });
  });
}

async function getAllSubjects() {
  return new Promise(resolve => {
    MongoLib.subjects.find({}, (subjectsErr, subjectsData) => {
      resolve({ data: subjectsData });
    });
  });
}

function search({ phrase, pageNumber, pageSize }) {
  return new Promise(resolve => {
    const searchParams = phrase ? { title: {$regex: new RegExp(phrase), $options: 'i'} } : {};
    MongoLib.articles.find(searchParams, (searchErr, searchResults) => {
      const mappedResults = searchResults.map((res) => {
        res.url = `/journals/${res.journalId}/article/${res.id}/${makeStringUrlFriendly(res.title)}`
        return res;
      });

      const finalResponse = {
        error: null,
        data: {
          total: mappedResults.length,
          pages: {
            pageNumber: pageNumber || 1,
            pageSize: pageSize || 10,
            totalPages: Math.ceil(mappedResults.length / (pageSize || 10)),
          },
          query: {
            phrase,
            // filters
          },
          // aggs: {
          //   types: response.data.types,
          //   subjects: response.data.subjects,
          // },
          results: mappedResults,
        },
      };

      resolve(finalResponse);
    });
  });

}

const MongoAdapter = {
  getOneJournal,
  getAllJournals,
  getOneArticle,
  getCurrentIssue,
  getAllSubjects,

  search,
};

module.exports = MongoAdapter;
