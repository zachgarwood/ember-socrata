import DS from 'ember-data';
import Ember from 'ember';
import Soda from 'npm:soda-js';

export default DS.Adapter.extend({
  defaultSerializer: 'socrata',
  findRecord(store, type, id) {
    let adapter = this;
    let consumer = new Soda.Consumer(adapter.get('config.dataRepo'));
    let modelId = `${type.modelName}_id`;
    let data = {};
    data[modelId] = id;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      consumer
        .query()
        .withDataset(adapter.get('dataset'))
        .where(data)
        .limit(1)
        .getRows()
        .on('success', function(data) {
          Ember.run(null, resolve, data);
        })
        .on('error', function(error) {
          Ember.run(null, reject, error);
        });
    });
  },
  findAll() {
    let adapter = this;
    let consumer = new Soda.Consumer(adapter.get('config.dataRepo'));
    return new Ember.RSVP.Promise(function(resolve, reject) {
      consumer
        .query()
        .withDataset(adapter.get('dataset'))
        .getRows()
        .on('success', function(data) {
          Ember.run(null, resolve, data);
        })
        .on('error', function(error) {
          Ember.run(null, reject, error);
        });
    });
  },
  query(store, type, query) {
    let adapter = this;
    let consumer = new Soda.Consumer(adapter.get('config.dataRepo'));
    return new Ember.RSVP.Promise(function(resolve, reject) {
      consumer
        .query()
        .withDataset(adapter.get('dataset'))
        .where(query)
        .getRows()
        .on('success', function(data) {
          Ember.run(null, resolve, data);
        })
        .on('error', function(error) {
          Ember.run(null, reject, error);
        });
    });
  },
});
