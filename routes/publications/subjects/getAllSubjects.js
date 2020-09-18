const PublicationsAdapter = require('../_adapters/autoselect');

module.exports = async function getAllSubjectsHandler(request, h) {
  console.log(`[API] Fetching subjects`);
  const allSubjectsData = await PublicationsAdapter.getAllSubjects();
  return allSubjectsData;
}
