import Mirage, {faker} from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  parent_id: function(i) {
    return i;
  },
  name: faker.lorem.word,
});
