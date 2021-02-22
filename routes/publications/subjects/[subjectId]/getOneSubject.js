const _ = require('lodash');
const PublicationsAdapter = require('../../_adapters/autoselect');

module.exports = function getAllSubjectsHandler(req, res) {
  const subjectId = req.params.subjectId;
  console.log(`[API] Fetching subject: ${subjectId}`);

  PublicationsAdapter.getAllSubjects((allSubjectsError, allSubjectsData) => {
    const oneSubjectData = _.find(allSubjectsData.data, { id: subjectId });
    return res.json({ data: oneSubjectData });
  })
}
