
module.exports.paginateResults = ({
  page = 0,
  pageSize = 10,
  results,
}) => {
  const resultsIntoPages = page * pageSize;
  return results.slice(resultsIntoPages, resultsIntoPages + pageSize);
};
