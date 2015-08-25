// update tasks with change in order selection
Template.orderDropdown.events({
  'click .order-dropdown-option': function(event) {
    var order = $(event.target).attr("id");
    $('#order').html(capitalize(order.split(" ")[0]));
    var orderValue = order == "ascending" ? 1 : -1;
    Session.set('order', orderValue);
  }
});
