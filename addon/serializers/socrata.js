import Ember from 'ember';
import JSONSerializer from 'ember-data/serializers/json';

export default JSONSerializer.extend({
  extractId(modelClass, resourceHash) {
    return resourceHash[`${Ember.String.underscore(modelClass.modelName)}_id`];
  },
  extractAttributes(modelClass, resourceHash) {
    for (let attribute in resourceHash) {
      let camelizedAttribute = attribute.endsWith('_id') ? attribute : Ember.String.camelize(attribute);
      if (attribute !== camelizedAttribute) {
        resourceHash[Ember.String.camelize(attribute)] = resourceHash[attribute];
        delete resourceHash[attribute];
      }
    }
    
    return this._super.apply(this, arguments);
  },
  keyForRelationship(key) {
    return `${key}_id`;
  },
  normalizeSingleResponse(store, primaryModelClass, payload, id, requestType) {
    return this._super(store, primaryModelClass, payload[0], id, requestType);
  },
});
