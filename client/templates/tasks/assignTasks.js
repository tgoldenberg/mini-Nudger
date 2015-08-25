Template.assignTasks.helpers({
  // display users that have assignee role enabled and belong to the same organization
  assignableUsers: function() {
    var options = {
      "profile.organizationId"  : Meteor.user().profile.organizationId,
      "profile.assignee"        : "on"
    };
    return Meteor.users.find(options);
  },

  // find all tasks that have status of pending, with available search and filter options
  assignableTasks: function() {
    var order       = Session.get('order');
    var importance  = Session.get('importance');
    var searchText  = Session.get('search');
    var options     = {
      organizationId: Meteor.user().profile.organizationId,
      status: "pending"
    };
    if (importance != "all") { // only include importance if selected
      options.importance = importance;
    }
    if (searchText == "") { // ignore search option if empty
      return Tasks.find(options, {sort: {createdAt: order}})
    } else { // regex to match with title and summary
      options.$or = [
        {title:    { $regex: searchText, $options: "i"}},
        {summary:  { $regex: searchText, $options: "i"}}
      ];
      return Tasks.find(options, {sort: {createdAt: order}});
    }
  },

  noAssignableTasks: function() { // check if there are no tasks to display
    var tasks = Tasks.find({
      organizationId: Meteor.user().profile.organizationId,
      status: "pending"
    });
    return tasks.count() == 0;
  }
});
