Template.allTasks.helpers({
  // render organization name in header of logged in users homepage
  organizationName: function() {
    var organization = Organizations.findOne(Meteor.user().profile.organizationId);
    return organization == null ? "" : organization.name;
  },

  // render all tasks with search and filters
  tasks: function() {
    var tasks;
    var order       = Session.get('order');
    var status      = Session.get('status');
    var importance  = Session.get('importance');
    var searchText  = Session.get('search');
    var options     = { organizationId: Meteor.user().profile.organizationId };

    if (status != "all") { // only include status if it is selected
      options.status = status;
    }
    if (importance != "all") { // only include importance if it is selected
      options.importance = importance;
    }
    if (searchText == "") { // if search is blank, proceed
      tasks = Tasks.find(options, {sort: {createdAt: order}});
    } else { // user regex with task title and summary
      options.$or = [
        {title:    { $regex: searchText, $options: "i"}},
        {summary:  { $regex: searchText, $options: "i"}}
      ];
      tasks = Tasks.find(options);
    }
    return tasks;
  },

  noTasks: function() { // return true if no current tasks
    var allTasks = Tasks.find({
      organizationId: Meteor.user().profile.organizationId
    });
    return allTasks.count() == 0;
  }
});

// create new card in modal dialog
Template.allTasks.events({
  'submit .new-task-form': function(event) {
    event.preventDefault();
    var title = event.target.title.value;
    var summary = event.target.summary.value;
    var importance = event.target.importance.value;
    if (title && summary && importance) {
      Tasks.insert({
        title: title,
        summary: summary,
        importance: importance,
        status: "pending",
        assignorId: null,
        assigneeId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        organizationId: Meteor.user().profile.organizationId
      });
    }
    $('.modal').modal('hide');
    $('body').removeClass('modal-open');
    event.target.title.value = "";
    event.target.summary.value = "";
    $('.modal-backdrop').remove();
    // call draggable again for new element
    $( "#sortable" ).sortable({ revert: true });
    $('.draggable').draggable(
        {
          revert: "invalid",
          connectToSortable: "#sortable",
          helper: "clone",
          snap: ".droppable"
        }
      );
  }
});
