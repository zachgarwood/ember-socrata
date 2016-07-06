Ember-Socrata
=============
[![NPM Version][npm-badge]][npm]
[![Ember Badge][ember-badge]][embadge]
[![Build Status][travis-badge]][travis]
[![Dependency Status][version-eye-badge]][version-eye]
[![Ember Observer Score][ember-observer-badge]][ember-observer]

[npm]: https://www.npmjs.org/package/ember-socrata
[npm-badge]: https://img.shields.io/npm/v/ember-socrata.svg
[embadge]: http://embadge.io/
[ember-badge]: http://embadge.io/v1/badge.svg?start=1.13.13
[travis]: https://travis-ci.org/zachgarwood/ember-socrata
[travis-badge]: https://travis-ci.org/zachgarwood/ember-socrata.svg?branch=master
[ember-observer]: https://emberobserver.com/addons/ember-socrata
[ember-observer-badge]: https://emberobserver.com/badges/ember-socrata.svg
[version-eye]: https://www.versioneye.com/user/projects/57525f907757a00034dc4150
[version-eye-badge]: https://www.versioneye.com/user/projects/57525f907757a00034dc4150/badge.svg?style=flat-square
-----
An adapter and serializer for interacting with Socrata open data services.

Currently, Ember-Socrata only handles [Socrata](https://dev.socrata.com/)'s Consumer API, ie. retrieving data.

# Installation
Ember-Socrata relies on [Soda-JS](https://github.com/socrata/soda-js) to communicate with Socrata data repositories,
as well as Ember-Browserify to make Soda-JS available to the Ember application.
```bash
ember install ember-socrata
ember install ember-browserify
npm install soda-js
```

# Configuration
In your project's `config/environment.js`:

```javascript 
module.exports = function(environment) {
  var ENV = {
    socrata: { dataRepo: 'some.data-repository.com' },
    // ...
  };
  // ...
};
```

# Usage
For each Socrata dataset you want to retrieve you must create a model and an
adapter:
```bash
ember generate model something
ember generate adapter something
```

## Models
In the model you should define attributes as normal, using camelCasedAttributes
where the dataset uses underscored_attributes.

Example:
### Socrata object
```javascript
{
    something_id: 123,
    some_attribute: 'some value',
    related_object_id: 456,
}
```

### Ember model
```javascript
// app/models/something.js

import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
    someAttribute: attr(),
    relatedObject: belongsTo('related-object'),
});
```

## Adapters
You must add a `dataset` property with the value of the Socrata dataset to the
model's adapter:
```javascript
// app/adapters/something.js

import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  dataset: 'ab12-34xy',
});
```
