import Adapter from 'ember-data/adapter';
import Ember from 'ember';
import Soda from 'npm:soda-js';

export default Adapter.extend({
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
      let queryBuilder = consumer.query().withDataset(adapter.get('dataset'));

      if ('soql' in query || 'query' in query) {
        let soql = query['soql'] || query['query'];
        queryBuilder.query(soql);
      }

      if ('where' in query) {
        let where = query['where'];
        if (where instanceof Array) {
          queryBuilder.where(...where);
        } else {
          queryBuilder.where(where);
        }
      }

      if ('limit' in query) {
        queryBuilder.limit(query['limit']);
      }

      if ('offset' in query) {
        queryBuilder.offset(query['offset']);
      }

      if ('order' in query) {
        queryBuilder.order(...query['order']);
      }

      if ('select' in query) {
        queryBuilder.order(...query['select']);
      }

      if ('q' in query) {
        queryBuilder.q(query['q']);
      }

      queryBuilder
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
