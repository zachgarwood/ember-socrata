import Mirage, {faker} from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  email: faker.internet.email,
  first_name: faker.name.firstName,
  last_name: faker.name.lastName,
  phone: faker.phone.phoneNumber,
  suffix: faker.name.suffix,
  company_id: Math.floor(Math.random() * 10) + 1,
});
