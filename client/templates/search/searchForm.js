// update session with user search
Template.searchForm.events({
  'submit .search-form': function(event) {
    event.preventDefault();
    var searchText = event.target.search_text.value;
    Session.set('search', searchText);
  }
});
