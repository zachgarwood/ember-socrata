import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | children');

test('visiting /children', function(assert) {
  visit('/children');

  andThen(function() {
    assert.equal(currentURL(), '/children');
  });
});
