if (Meteor.isClient) {
  Template.landingNav.events({
    'submit .user-login': function(event) {
      event.preventDefault();
      console.log("form submitted", event);
      var email = event.target.loginEmail.value;
      var password = event.target.loginPassword.value;
      console.log("email", email);
      console.log("password", password);
      Meteor.loginWithPassword(email, password);
    }
  });

  Template.loggedInNav.events({
    'click .logout': function(event) {
      event.preventDefault();
      console.log("logout", event);
      Meteor.logout();
    }
  });

  Template.landingContent.helpers({
    organizationOptions: function() {
      return Organizations.find();
    }
  });

  Template.landingContent.events({
    'submit .new-user-registration': function(event) {
      event.preventDefault();
      console.log("submit signup", event);
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
