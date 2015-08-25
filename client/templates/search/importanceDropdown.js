// update tasks with change to importance selection
Template.importanceDropdown.events({
  'click .importance-dropdown-option': function(event) {
    var importance = $(event.target).attr("id");
    $('#importance').html(capitalize(importance));
    Session.set('importance', importance);
  }
});
