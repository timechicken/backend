'use strict';

module.exports = Activity;
var TimeSession = require('./TimeSession.js');

function Activity(data) {
  data = data || {};
  this.name = data.name || '';
  this.details = data.details || '';
  this.status = data.status;
  this.due = data.due;
  this.timeSessions = data.timeSessions || [];
}

Activity.prototype.complete = function () {
  this.complete = true;
  this.completedAt = new Date();
};

Activity.prototype.reopen = function () {
  this.complete = false;
  this.completedAt = null;
};

Activity.prototype.startTimeSession = function () {
  var newTimeSession = new TimeSession();
  // newTimeSession.parent = this._id;
  // this.timeSessions.push(newTimeSession);
  return newTimeSession;
};
