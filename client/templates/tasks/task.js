// render full name of task assignor and assignee
Template.task.helpers({
  assigneeVar: function() {
    if (this.assigneeId == null) {
      return "none"
    } else {
      var assigneeProfile = Meteor.users.findOne(this.assigneeId).profile;
      return assigneeProfile.firstName + " " + assigneeProfile.lastName;
    }
  },
  assignorVar: function() {
    if (this.assignorId == null) {
      return "none"
    } else {
      var assignorProfile = Meteor.users.findOne(this.assignorId).profile;
      return assignorProfile.firstName + " " + assignorProfile.lastName;
    }
  }
});
