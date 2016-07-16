import ENV from '../config/environment';

var _queryForItems = function(collection, key, value) {
  let results = [];
  collection.forEach(function(model) {
    for (let attribute in model) {
      if (attribute === key && model[attribute] == value) { // jshint ignore:line
        results.push(model);
      }
    }
  });
  return results;
};

var _getResults = function(collection, queryParams) {
  let results = [];
  if ('$where' in queryParams) {
    console.log('$where: ' + queryParams['$where']);
    let pattern = /\((\w*) = '([^']*)'\)/ig;
    let matches = pattern.exec(queryParams['$where']);
    results = _queryForItems(collection, matches[1], matches[2]);
  } else {
    results = collection;
  }
  if ('$limit' in queryParams) {
    console.log('$limit: ' + queryParams['$limit']);
    results.splice(0, (results.length - queryParams['$limit']));
  }
  return results;
};

export default function() {
  this.urlPrefix = 'https://' + ENV.socrata.dataRepo;
  this.namespace = 'resource';

  // parent 
  this.get('/abcd-1234.json', function({ db }, request) {
    return _getResults(db.parents, request.queryParams);
  });

  // child 
  this.get('/wxyz-7890.json', function({ db }, request) {
    return _getResults(db.children, request.queryParams);
  });
}
