// logout user
Template.loggedInNav.events({
  'click .logout': function(event) {
    event.preventDefault();
    Meteor.logout();
  }
});
