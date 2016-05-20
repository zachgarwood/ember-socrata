import ENV from '../config/environment';
import SocrataAdapter from 'ember-socrata/adapters/socrata';
import Soda from 'npm:soda-js';

export default SocrataAdapter.extend({
  config: ENV.socrata,
});
