/**
 * Created by Andy on 4/3/2014.
 * Generate a Backbone.js, Ember.js, AND/or Spine.js app that allows a user to create, edit, update, and destroy (delete) users. *
 * Users should have first name, last name, and email address fields. First name is required. Email should be a valid email.
 */

var User = Backbone.Model.extend({
    defaults: {
        firstName: '',
        lastName: '',
        email: '',
        id: 0
    }
});

var Users = Backbone.Collection.extend({
    model: User
});