import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('parents');
  this.route('parent', { path: '/parent/:parent_id' });
  this.route('children');
  this.route('child', { path: '/child/:child_id' });
});

export default Router;
