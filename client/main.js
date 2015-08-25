if (Meteor.isClient) {
  Meteor.subscribe('users');
  Meteor.subscribe('tasks');
  Meteor.subscribe('organizations');
  Session.set('order', -1);
  Session.set('importance', 'all');
  Session.set('status', 'all');
  Session.set('search', "");
}
