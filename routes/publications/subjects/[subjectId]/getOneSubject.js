const _ = require('lodash');
const PublicationsAdapter = require('../../_adapters/autoselect');

module.exports = async function getAllSubjectsHandler(request, h) {
  return new Promise(resolve => {
    const subjectId = request.params.subjectId;
    console.log(`[API] Fetching subject: ${subjectId}`);

    PublicationsAdapter.getAllSubjects()
      .then(allSubjectsData => {
        const oneSubjectData = _.find(allSubjectsData.data, { id: subjectId });
        return resolve({ data: oneSubjectData });
      })
  });
}
