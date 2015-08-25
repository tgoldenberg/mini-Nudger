// login as registered User
Template.landingNav.events({
  'submit .user-login': function(event) {
    event.preventDefault();
    var email = event.target.loginEmail.value;
    var password = event.target.loginPassword.value;
    Meteor.loginWithPassword(email, password);
  }
});
