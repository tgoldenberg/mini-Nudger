if (Meteor.isServer) {
  Meteor.publish("users", function () {
    if (this.userId) {
      return Meteor.users.find({},{fields: {'profile': 1}});
    }
  });

  Meteor.publish('tasks', function() {
    if (this.userId) {
      return Tasks.find();
    }
  });

  Meteor.publish('organizations', function() {
    return Organizations.find();
  });
}
