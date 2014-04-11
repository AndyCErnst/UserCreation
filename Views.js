/**
 * Created by Andy on 4/3/2014.
 * Generate a Backbone.js, Ember.js, AND/or Spine.js app that allows a user to create, edit, update, and destroy (delete) users. *
 * Users should have first name, last name, and email address fields. First name is required. Email should be a valid email.
 */

var UserView = Backbone.View.extend({
    template: _.template($('#user-template').html()),
    edit: _.template($('#edit-user-template').html()),
    events: {
        'click .edit': 'editUser',
        'click .delete': 'deleteUser',
        'submit #editUser': 'saveEdit'
    },
    render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    deleteUser: function(){
        userListView.collection.remove(this.model);
        this.$el.html('');
    },
    editUser: function(){
        this.$el.html(this.edit(this.model.toJSON()));
    },
    saveEdit: function(event){
        event.preventDefault();
        this.model.set({
            'firstName': $("#editFirstName").val(),
            'lastName': $("#editLastName").val(),
            'email': $("#editEmail").val()
        });
        this.render();
    }
});

var UserListView = Backbone.View.extend({
    id: 1,
    el: '.app',
    form: _.template($('#create-user-template').html()),
    initialize: function(){this.$el.html(this.form)},
    events: {
        'submit #userInfo': 'createUser'
    },
    createUser : function(event){
        event.preventDefault();
        var user = new User({
            'id': this.id,
            'firstName': $("#firstName").val(),
            'lastName': $("#lastName").val(),
            'email': $("#email").val()
        });
        this.id++;
        this.collection.add(user);
        this.rerenderAll();
    },
    rerenderAll: function(){
        this.$el.empty();
        this.$el.html(this.form);
        this.collection.forEach(this.renderOne, this);
    },
    renderOne: function(model){
        var userView = new UserView({model: model});
        this.$el.append(userView.render().el);
    }
});

var users = new Users;
var userListView = new UserListView({collection: users});