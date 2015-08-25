if (Meteor.isClient) {
  Meteor.subscribe('users');
  Meteor.subscribe('tasks');
  Meteor.subscribe('organizations');

  Session.set('order', -1);
  Session.set('importance', 'all');
  Session.set('status', 'all');
  Session.set('search', "");

  Template.assignableUser.helpers({
    initials: function() {
      return this.profile.firstName.split("")[0] + this.profile.lastName.split("")[0];
    }
  });

  Template.assignableUser.onRendered(function() {
    $( "#sortable" ).sortable({
      revert: true
    })
    $('.draggable').draggable(
                              {
                                revert: "invalid",
                                connectToSortable: "#sortable",
                                helper: "clone",
                                snap: ".droppable"
                              }
                            );

    $('.droppable').droppable({
      drop: function(event, ui) {
        var firstName = $(event.target).find('.user-name').html().split(" ")[0];
        var lastName = $(event.target).find('.user-name').html().split(" ")[1];
        var title = $(ui.draggable).find('.title').html();
        var importance = $(ui.draggable).find('.importance').html();
        var selectedTask = Tasks.findOne({
          title: title,
          importance: importance,
          organizationId: Meteor.user().profile.organizationId
        });
        var selectedUser = Meteor.users.findOne({
          "profile.firstName": firstName,
          "profile.lastName": lastName,
          "profile.organizationId": Meteor.user().profile.organizationId
        });
        Tasks.update(selectedTask._id, {$set:
                                          {
                                            status: "assigned",
                                            assigneeId: selectedUser._id,
                                            assignorId: Meteor.userId(),
                                            updatedAt: new Date()
                                          }
                                        }
                                      );
      }
    });
  });

  Template.assignTasks.helpers({
    assignableUsers: function() {
      var options = {
        "profile.organizationId"  : Meteor.user().profile.organizationId,
        "profile.assignee"        : "on"
       }
      return Meteor.users.find(options);
    }
  });

  Template.searchForm.events({
    'submit .search-form': function(event) {
      event.preventDefault();
      var searchText = event.target.search_text.value;
      Session.set('search', searchText);
    }
  });

  Template.statusDropdown.events({
    'click .status-dropdown-option': function(event) {
      var status = $(event.target).attr("id");
      $('#status').html(status);
      Session.set('status', status);
    }
  });

  Template.importanceDropdown.events({
    'click .importance-dropdown-option': function(event) {
      var importance = $(event.target).attr("id");
      $('#importance').html(importance);
      Session.set('importance', importance);
    }
  });

  Template.orderDropdown.events({
    'click .order-dropdown-option': function(event) {
      var order = $(event.target).attr("id");
      $('#order').html(order.split(" ")[0]);
      var orderValue = order == "ascending" ? 1 : -1;
      Session.set('order', orderValue);
    }
  });

  Template.landingNav.events({
    'submit .user-login': function(event) {
      event.preventDefault();
      var email = event.target.loginEmail.value;
      var password = event.target.loginPassword.value;
      Meteor.loginWithPassword(email, password);
    }
  });

  Template.loggedInNav.events({
    'click .logout': function(event) {
      event.preventDefault();
      Meteor.logout();
    }
  });

  Template.allTasks.helpers({
    organizationName: function() {
      var organization = Organizations.findOne(Meteor.user().profile.organizationId);
      return organization == null ? null : organization.name;
    },
    tasks: function() {
      var tasks;
      var order       = Session.get('order');
      var status      = Session.get('status');
      var importance  = Session.get('importance');
      var searchText  = Session.get('search');
      var options     = {organizationId: Meteor.user().profile.organizationId};
      if (status != "all") {
        options.status = status;
      }
      if (importance != "all") {
        options.importance = importance;
      }
      if (searchText == "") {
        tasks = Tasks.find(options, {sort: {createdAt: order}});
      } else {
        options.$or = [
                        {title:    { $regex: searchText, $options: "i"}},
                        {summary:  { $regex: searchText, $options: "i"}}
                      ];
        tasks = Tasks.find(options);
      }
      return tasks;
    },

    noTasks: function() {
      var allTasks = Tasks.find({
        organizationId: Meteor.user().profile.organizationId
      });
      return allTasks.count() == 0;
    }
  });

  Template.landingContent.helpers({
    organizationOptions: function() {
      return Organizations.find();
    }
  });
  Template.task.helpers({
    assigneeVar: function() {
      return this.assigneeId == null ? "none" : this.assigneeId;
    },
    assignorVar: function() {
      return this.assignorId == null ? "none" : this.assignorId;
    }
  });

  Template.assignTasks.helpers({
    assignableTasks: function() {
      var order       = Session.get('order');
      var importance  = Session.get('importance');
      var searchText  = Session.get('search');
      var options     = {organizationId: Meteor.user().profile.organizationId, status: "pending"};

      if (importance != "all") {
        options.importance = importance;
      }
      if (searchText == "") {
        return Tasks.find(options, {sort: {createdAt: order}})
      } else {
        options.$or = [
                        {title:    { $regex: searchText, $options: "i"}},
                        {summary:  { $regex: searchText, $options: "i"}}
                      ];
        return Tasks.find(options, {sort: {createdAt: order}});
      }
    },
    noAssignableTasks: function() {
      var tasks = Tasks.find({
        organizationId: Meteor.user().profile.organizationId,
        status: "pending"
      });
      return tasks.count() == 0;
    }
  });

  Template.myTasks.helpers({
    personalTasks: function() {
      var tasks;
      var order       = Session.get('order');
      var status      = Session.get('status');
      var importance  = Session.get('importance');
      var searchText  = Session.get('search');
      var options     = {
                          organizationId: Meteor.user().profile.organizationId,
                          assigneeId: Meteor.userId()
                        };
      if (status != "all") {
        options.status = status;
      }
      if (importance != "all") {
        options.importance = importance;
      }
      if (searchText == "") {
        tasks = Tasks.find(options, {sort: {createdAt: order}});
      } else {
        options.$or = [
                        {title:    { $regex: searchText, $options: "i"}},
                        {summary:  { $regex: searchText, $options: "i"}}
                      ];
        tasks = Tasks.find(options);
      }
      return tasks;
    },
    noPersonalTasks: function() {
      var tasks = Tasks.find({
        organizationId: Meteor.user().profile.organizationId,
        assigneeId: Meteor.userId()
      })
      return tasks.count() == 0;
    }
  });


  Template.landingContent.events({
    'submit .new-user-registration': function(event) {
      event.preventDefault();
      var firstName = event.target.registerFirstName.value;
      var lastName = event.target.registerLastName.value;
      var email = event.target.registerEmail.value;
      var password = event.target.registerPassword.value;
      var organization = event.target.registerOrganization.value;
      var organizationId = Organizations.findOne({name: organization})._id;
      var position = event.target.registerPosition.value;
      var assignee = event.target.registerAssignee.value;
      var assignor = event.target.registerAssignor.value;
      Accounts.createUser({
        email: email,
        password: password,
        profile: {
          firstName: firstName,
          lastName: lastName,
          organizationId: organizationId,
          position: position,
          assignee: assignee,
          assignor: assignor
        }
      });
    }
  })
}
