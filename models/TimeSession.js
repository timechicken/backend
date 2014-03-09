'use strict';

module.exports = TimeSession;

function TimeSession(data) {
  data = data || {};
  this.start = data.start || new Date();
  this.end = data.end;
}

TimeSession.prototype.getDuration = function() {
  if (this.end) { return this.end - this.start; }
};
