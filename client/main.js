
if (Meteor.isClient) {
  Meteor.subscribe('users');
  Meteor.subscribe('tasks');
  Meteor.subscribe('organizations');

  Session.set('order', -1);
  Session.set('importance', 'all');
  Session.set('status', 'all');

  Template.loggedInContent.events({
    'click .pending': function(event) {
      document.getElementById('status').innerHTML = "Pending";
      Session.set('status', 'pending');
    },
    'click .assigned': function() {
      document.getElementById('status').innerHTML = "Assigned";
      Session.set('status', 'assigned');
    },
    'click .completed':function() {
      document.getElementById('status').innerHTML = "Completed";
      Session.set('status', 'completed');
    },
    'click .status-all':function() {
      document.getElementById('status').innerHTML = "All";
      Session.set('status', 'all');
    },
    'click .high': function() {
      document.getElementById('importance').innerHTML = "High";
      Session.set('importance', 'high');
    },
    'click .medium': function() {
      document.getElementById('importance').innerHTML = "Medium";
      Session.set('importance', 'medium');
    },
    'click .low': function() {
      document.getElementById('importance').innerHTML = "Low";
      Session.set('importance', 'low');
    },
    'click .importance-all':function() {
      document.getElementById('importance').innerHTML = "All";
      Session.set('importance', 'all');
    },
    'click .ascending':function() {
      document.getElementById('order').innerHTML = "Ascending";
      Session.set('order', 1)
    },
    'click .descending':function() {
      document.getElementById('order').innerHTML = "Descending";
      Session.set('order', -1);
    }
  })

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
      var order = Session.get('order');
      var tasks = Tasks.find({
        organizationId: Meteor.user().profile.organizationId
      }, {sort: {createdAt: order}});
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
      return Tasks.find({
        organizationId: Meteor.user().profile.organizationId,
        status: "pending"
      }, {sort: {createdAt: -1}})
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
      return Tasks.find({
        organizationId: Meteor.user().profile.organizationId,
        assigneeId: Meteor.userId()
      });
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
