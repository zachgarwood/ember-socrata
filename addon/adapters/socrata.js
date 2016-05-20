import DS from 'ember-data';
import Ember from 'ember';
import Soda from 'npm:soda-js';

export default DS.Adapter.extend({
  findRecord(store, type, id) {
    let adapter = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      let consumer = new Soda.Consumer('data.cityofchicago.org');
      let modelId = `${type.modelName}_id`;
      let data = {};
      data[modelId] = id;
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
    return new Ember.RSVP.Promise(function(resolve, reject) {
      let consumer = new Soda.Consumer('data.cityofchicago.org');
      consumer
        .query()
        .withDataset(adapter.get('dataset'))
        .limit()
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
    return new Ember.RSVP.Promise(function(resolve, reject) {
      let consumer = new Soda.Consumer('data.cityofchicago.org');
      consumer
        .query()
        .withDataset(adapter.get('dataset'))
        .where(query)
        .limit()
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
