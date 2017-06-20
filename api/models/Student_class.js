/**
 * Student_class.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    student_class_id: {
      type: 'integer',
      // you can only have these two once in a model!!!
      primaryKey: true,
      autoIncrement: true
    },

    student_id: {
      type: 'integer'
    },

    class_id: {
      type: 'integer'
    }

  },
  // tells sails NOT to create a primary key
  autoPK: false
};  
