/**
 * Grade.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    grade_id: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true
    },

    grade: {
      type: 'string',
      maxLength: 30
    }

  },
  // tells sails NOT to create a primary key
  autoPK: false
};
