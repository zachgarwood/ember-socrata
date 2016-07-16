import Mirage, {faker} from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  parentId: function(i) {
    return i + 1;
  },
  name() { return faker.lorem.words(1); },
});
