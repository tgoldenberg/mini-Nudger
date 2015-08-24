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
}
