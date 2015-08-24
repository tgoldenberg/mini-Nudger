if (Meteor.isClient) {
  var user = Meteor.users.findOne(Meteor.userId());
  console.log(user);

  if (user) {
    var organizationId = Meteor.user().profile.organizationId;
    var userId = Meteor.userId();

    Session.tasks = Tasks.find({
      organizationId: organizationId
    }, {sort: {createdAt: -1}});

    Session.personalTasks = Tasks.find({
      organizationId: organizationId,
      assigneeId: userId
    }, {sort: {createdAt: -1}});

    Session.assignableTasks = Tasks.find({
      organizationId: organizationId,
      status: "pending"
    }, {sort: {createdAt: -1}});

    Session.organizationName = Organizations.findOne(organizationId).name;
  }


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
      return Session.organizationName;
    },
    tasks: function() {
      return Session.tasks;
    },
    noTasks: function() {
      return Session.tasks.count() == 0;
    }
  })

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
      return Session.assignableTasks;
    },
    noAssignableTasks: function() {
      return Session.assignableTasks.count() == 0;
    }
  });

  Template.myTasks.helpers({
    personalTasks: function() {
      return Session.personalTasks;
    },
    noPersonalTasks: function() {
      return Session.personalTasks.count() == 0;
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
