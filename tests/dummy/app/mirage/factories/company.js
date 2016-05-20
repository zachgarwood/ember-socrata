import Mirage, {faker} from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  address_1: faker.address.streetAddress,
  address_2: faker.address.secondaryAddress,
  city: faker.address.city,
  name: faker.companyName,
  state: faker.address.stateAbbr,
  zip: faker.address.zipCode,
});
