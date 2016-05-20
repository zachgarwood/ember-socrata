import ENV from '../../config/environment';

export default function() {

  this.urlPrefix = ENV.socrata.dataRepo;
  this.namespace = 'resource';

  // parent 
  this.get('/abcd-1234.json', function(db, request) {
    return this._getResults(db.parent, request.queryParams);
  });

  // child 
  this.get('/wxyz-7890.json', function(db, request) {
    return this._getResults(db.child, request.queryParams);
  });

  this._getResults = function(collection, queryParams) {
    let results = [];
    if ('$where' in queryParams) {
      let query = queryParams['$where'].split(' = ');
      results = this._queryForItems(collection, query);
    } else {
      results = collection;
    }

    return results;
  };

  this._queryForItems = function(collection, query) {
    let results = [];
    collection.forEach(function(model) {
      for (let attribute in model) {
        if (attribute === query[0] && model[attribute] === query[1]) {
          results.push(model);
        }
      }
    });
    return results;
  };
}
