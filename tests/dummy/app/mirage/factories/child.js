import Mirage, {faker} from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  child_id: function(i) {
    return i + 1;
  },
  parent_id: Math.floor(Math.random() * 10) + 1,
  name() { return faker.lorem.words(1); },
});
