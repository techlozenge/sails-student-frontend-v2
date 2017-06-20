/**
 * Student.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    student_id: {
      type: 'integer',
      // you can only have these two once in a model!!!
      primaryKey: true,
      autoIncrement: true
    },

    first_name: {
      type: 'string',
      minLength: 2,
      maxLength: 30
    },

    last_name: {
      type: 'string',
      minLength: 2,
      maxLength: 30
    },

    start_date: {
      type: 'date'
    },

    // this removes the date-time stamp inserted by sails ORM
    toJSON: function() {
      var obj = this.toObject();
      obj.start_date = obj.start_date.slice(0,-14);
      return obj;
    },

    gpa: {
      type: 'decimal'
    },

    sat: {
      type: 'integer',
      maxLength: 4
    },

    major_id: {
      type: 'integer'
    }

  },
  // tells sails NOT to create a primary key
  autoPK: false
};
