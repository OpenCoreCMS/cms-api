const MongoLib = require('../../../lib/mongo');
const { makeStringUrlFriendly } = require('../../../lib/utils');

function getOneArticle(articleId, callback) {
  return MongoLib.articles.find({ id: articleId }, (articleErr, articleData) => {
    return callback(null, { data: articleData[0] });
  });
}

function getAllJournals(callback) {
  return MongoLib.journals.find({}, (allJournalsErr, allJournalsData) => {
    return callback(null, { data: allJournalsData });
  });
}

function getOneJournal(journalId, callback) {
  return MongoLib.journals.find({ id: journalId }, (allJournalsErr, allJournalsData) => {
    return callback(null, { data: allJournalsData[0] });
  });
}

function getCurrentIssue(callback) {
  return MongoLib.articles.find({}, (articleErr, articleData) => {
    return callback(null, { data: articleData });
  });
}

function getAllSubjects(callback) {
  return MongoLib.subjects.find({}, (subjectsErr, subjectsData) => {
    return callback(null, { data: subjectsData });
  });
}

function search({ phrase, pageNumber, pageSize, subjectId }, callback) {
  const searchParams = {};

  if (phrase) {
    searchParams.title = { $regex: new RegExp(phrase), $options: 'i' };
  }

  if (subjectId) {
    searchParams.subjects = { $in: [subjectId] };
  }
  console.log(searchParams);

  return MongoLib.articles.find(searchParams, (searchErr, searchResults) => {
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

    return callback(null, finalResponse);
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
