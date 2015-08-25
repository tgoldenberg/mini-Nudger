Tasks = new Mongo.Collection("tasks");
Tasks.allow({
  insert: function(userId, doc) {
    // only allow posting if you are logged in
    return !! userId;
  }
});
Tasks.allow({
  update: function(userId, doc) {
    // only allow posting if you are logged in
    return !! userId;
  }
});
