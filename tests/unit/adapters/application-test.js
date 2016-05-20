import { moduleFor, test } from 'ember-qunit';

moduleFor('adapter:application', 'Unit | Adapter | application', {
  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']
});

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
