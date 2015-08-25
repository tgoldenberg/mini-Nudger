Template.myTasks.helpers({
  // find all tasks that one is the assignee to
  personalTasks: function() {
    var tasks;
    var order       = Session.get('order');
    var status      = Session.get('status');
    var importance  = Session.get('importance');
    var searchText  = Session.get('search');
    var options     = {
      organizationId: Meteor.user().profile.organizationId,
      assigneeId: Meteor.userId()
    };
    if (status != "all") { // ignore status unless selected
      options.status = status;
    }
    if (importance != "all") { // ignore importance unless selected
      options.importance = importance;
    }
    if (searchText == "") { // ignore search if empty
      tasks = Tasks.find(options, {sort: {createdAt: order}});
    } else { // regex to match title and summary of task
      options.$or = [
        {title:    { $regex: searchText, $options: "i"}},
        {summary:  { $regex: searchText, $options: "i"}}
      ];
      tasks = Tasks.find(options);
    }
    return tasks;
  },

  noPersonalTasks: function() { // check to see if there are no tasks to display
    var tasks = Tasks.find({
      organizationId: Meteor.user().profile.organizationId,
      assigneeId: Meteor.userId()
    });
    return tasks.count() == 0;
  }
});
