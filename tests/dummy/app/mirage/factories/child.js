import Mirage, {faker} from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  child_id: function(i) {
    return i;
  },
  parent_id: Math.floor(Math.random() * 10) + 1,
  name: faker.lorem.word,
});
