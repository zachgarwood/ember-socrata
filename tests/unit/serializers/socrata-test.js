import { moduleFor, test } from 'ember-qunit';
import startMirage from '../../helpers/setup-mirage-for-integration';

moduleFor('serializer:application', 'Unit | Serializer | socrata', {
  beforeEach() {
    startMirage(this.container);
  },
  afterEach() {
    window.server.shutdown();
  },
});

test('default id is extracted', function(assert) {
  let serializer = this.subject();
  server.db.createCollection('test');
  let resource = server.db.test.insert({
    'model-name-id': 'model-name-id',
    ModelNameId: 'ModelNameId',
    model_name_id: 'model_name_id',
  });
  // Mirage automatically adds an `id` property, so we need to remove it
  // for this test.
  delete resource.id;

  assert.equal(
    serializer.extractId({ modelName: 'model-name' }, resource),
    'model_name_id',
    'The default id in resources is the underscored model name with "_id" appended'
  );
});

test('primary key id is extracted', function(assert) {
  let serializer = this.subject();
  serializer.primaryKey = 'testPrimaryKey';
  server.db.createCollection('test');
  let resource = server.db.test.insert({
    model_name_id: 'model_name_id', // the default id
    testPrimaryKey: 'testPrimaryKey',
  });
  // Mirage automatically adds an `id` property, so we need to remove it
  // for this test.
  delete resource.id;

  assert.equal(
    serializer.extractId({ modelName: 'model-name' }, resource),
    'testPrimaryKey',
    'Setting the primary key takes precedence over the default id'
  );
});

test('no default id or set primary key throws an error', function(assert) {
  let serializer = this.subject();
  server.db.createCollection('test');
  let resource = server.db.test.insert({
    test_attribute: 'test value',
    another_test_attribute: 'another test value',
  });
  // Mirage automatically adds an `id` property, so we need to remove it
  // for this test.
  delete resource.id;

  assert.throws(
    function() {
      serializer.extractId({ modelName: 'model-name' }, resource);
    },
    Error,
    'No defualt id or primary key results in an error'
  );
  assert.throws(
    function() {
      serializer.extractId({ modelName: 'model-name' }, resource);
    },
    /Try setting a 'primaryKey'/,
    'Error instructs user to set a `primaryKey`'
  );
});

test('attributes are extracted', function(assert) {
  let serializer = this.subject();
  server.db.createCollection('test');
  let resource = server.db.test.insert({
    model_name_id: 'model_name_id',
    ends_with_id: 'ends_with_id',
    underscore_attribute: 'underscoreAttribute',
    word: 'word', 
  });
  // Mirage automatically adds an `id` property, so we need to remove it
  // for this test.
  delete resource.id;

  assert.expect(4);
  let attrs = serializer._camelizeAttributes({ modelName: 'model-name' }, resource);
  for (var key in attrs) {
    assert.equal(attrs[key], key);
  }
});

test('key for relationship', function(assert) {
  let serializer = this.subject();

  assert.equal(
    serializer.keyForRelationship('relatedModelName'),
    'related_model_name_id',
    'Relationship keys in requests are the related model name with "_id" appended'
  );
});
