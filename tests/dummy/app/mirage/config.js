import ENV from '../../config/environment';

export default function() {

  this.urlPrefix = ENV.socrata.dataRepo;
  this.namespace = 'resource';

  // companies
  this.get('/abcd-1234.json', function(db, request) {
    let results = [];
    if ('$where' in request.queryParams) {
      let query = request.queryParams['$where'].split(' = ');
      results = this._queryForItems(db.company, query);
    } else {
      results = db.company;
    }

    return results;
  });

  // employees
  this.get('/wxyz-7890.json', function(db, request) {
    let results = [];
    if ('$where' in request.queryParams) {
      let query = request.queryParams['$where'].split(' = ');
      results = this._queryForItems(db.employee, query);
    } else {
      results = db.employee;
    }

    return results;
  });

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
