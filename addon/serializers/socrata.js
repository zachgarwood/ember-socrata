import Ember from 'ember';
import JSONSerializer from 'ember-data/serializers/json';

export default JSONSerializer.extend({
  extractId(modelClass, resourceHash) {
    let possibleIds = [
      this.get('primaryKey'),
      `${Ember.String.underscore(modelClass.modelName)}_id`
    ];
    let validIds = possibleIds.filter(function(id) {
      return resourceHash.hasOwnProperty(id);
    });
    if (validIds.length > 0) {
      return resourceHash[validIds.shift()];
    } else {
      Ember.Logger.error(
        `Error: Could not determine an id for the '${modelClass.modelName}' model. ` +
        `Try setting a 'primaryKey' in the '${modelClass.modelName}' serializer.`
      );
    }
  },
  extractAttributes(modelClass, resourceHash) {
    this._camelizeAttributes(modelClass, resourceHash); 
    return this._super.apply(this, arguments);
  },
  keyForRelationship(key) {
    return `${Ember.String.underscore(key)}_id`;
  },
  normalizeSingleResponse(store, primaryModelClass, payload, id, requestType) {
    return this._super(store, primaryModelClass, payload[0], id, requestType);
  },

  _camelizeAttributes(modelClass, resourceHash) {
    for (let attribute in resourceHash) {
      let camelizedAttribute =
        attribute.indexOf('_id') === (attribute.length - 3) ? attribute : Ember.String.camelize(attribute);
      if (attribute !== camelizedAttribute) {
        resourceHash[Ember.String.camelize(attribute)] = resourceHash[attribute];
        delete resourceHash[attribute];
      }
    }

    return resourceHash;
  },
});
