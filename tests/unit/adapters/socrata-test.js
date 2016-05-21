import { moduleFor, test } from 'ember-qunit';

moduleFor('adapter:application', 'Unit | Adapter | socrata', {});

test('api consumer methods are defined', function(assert) {
  let adapter = this.subject();
  let methods = [ 'findAll', 'findRecord', 'query' ];
  assert.expect(3);
  methods.forEach(function(method) {
    assert.ok(
      typeof adapter[method] === 'function',
      `The Ember-Socrata adapter has defined the "${method}" method`
    );
  });
});

test('default serializer is set', function(assert) {
  let adapter = this.subject();
  assert.equal('socrata', adapter.defaultSerializer, 'The default serializer is set to "socrata"');
});
