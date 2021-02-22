const PublicationsAdapter = require('../_adapters/autoselect');

module.exports = function getAllSubjectsHandler(req, res) {
  console.log(`[API] Fetching subjects`);
  const allSubjectsData = PublicationsAdapter.getAllSubjects((allSubjectsError, allSubjectsData) => {
    return res.json(allSubjectsData);
  });
}
