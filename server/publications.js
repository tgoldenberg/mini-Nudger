if (Meteor.isServer) {
  Meteor.publish("users", function () {
    if (this.userId) {
      return Meteor.users.findOne(this.userId);
    }
  });

  Meteor.publish('tasks', function() {
    if (this.userId) {
      return Tasks.find();
    }
  });

  Meteor.publish('organizations', function() {
    if (this.userId) {
      return Organizations.find();
    }
  });
}
