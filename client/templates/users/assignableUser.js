// get initials for avatar grabber
Template.assignableUser.helpers({
  initials: function() {
    return this.profile.firstName.split("")[0] + this.profile.lastName.split("")[0];
  }
});

// initiate draggable and droppable elements
Template.assignableUser.onRendered(function() {
  // check if user has assignor privileges
  if (Meteor.user().profile.assignor) {
    // make tasks sortable to give animation effect on drop
    $( "#sortable" ).sortable({ revert: true });
    // set draggable config
    $('.draggable').draggable(
        {
          revert: "invalid",
          connectToSortable: "#sortable",
          helper: "clone",
          snap: ".droppable"
        }
      );

    // set droppable config, update task on drop
    $('.droppable').droppable({
      drop: function(event, ui) {
        var name = $(event.target).find('.user-name').html();
        var title = $(ui.draggable).find('.title').html();
        var importance = $(ui.draggable).find('.importance').html();

        // look up selected task in databse
        var selectedTask = Tasks.findOne({
          title: title,
          importance: importance,
          organizationId: Meteor.user().profile.organizationId
        });

        // look up selected user in database
        var selectedUser = Meteor.users.findOne({
          "profile.firstName": name.split(" ")[0],
          "profile.lastName": name.split(" ")[1],
          "profile.organizationId": Meteor.user().profile.organizationId
        });

        // update task to reflect current assignee and new status
        Tasks.update(selectedTask._id,
          {$set:
            {
              status: "assigned",
              assigneeId: selectedUser._id,
              assignorId: Meteor.userId(),
              updatedAt: new Date()
            }
          }
        );
      }
    });
  }
});
