// new user registration
Template.landingContent.events({
  'submit .new-user-registration': function(event) {
    event.preventDefault();
    var target = event.target;
    var organization = event.target.registerOrganization.value;
    var organizationId = Organizations.findOne({name: organization})._id;
    Accounts.createUser({
      email: target.registerEmail.value,
      password: target.registerPassword.value,
      profile: {
        firstName: target.registerFirstName.value,
        lastName: target.registerLastName.value,
        organizationId: organizationId,
        position: target.registerPosition.value,
        assignee: target.registerAssignee.value,
        assignor: target.registerAssignor.value
      }
    });
  }
});

// organizations for select field
Template.landingContent.helpers({
  organizationOptions: function() {
    return Organizations.find();
  }
});