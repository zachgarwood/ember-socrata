import Mirage, {faker} from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  childId: function(i) {
    return i + 1;
  },
  parentId: Math.floor(Math.random() * 10) + 1,
  name() { return faker.lorem.words(1); },
});
