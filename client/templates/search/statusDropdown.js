// update tasks with change in status
Template.statusDropdown.events({
  'click .status-dropdown-option': function(event) {
    var status = $(event.target).attr("id");
    $('#status').html(capitalize(status));
    Session.set('status', status);
  }
});
