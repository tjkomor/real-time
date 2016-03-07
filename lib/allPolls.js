const Poll = require('./poll')
const createId = require('./create-id');
const _ = require('lodash');

function allPolls(){
  this.list = {};
}

allPolls.prototype.addPoll = function (pollData) {
  var id = createId();
  this.list[id] = new Poll(pollData);
  return id;
};

allPolls.prototype.urls = function (id) {
  return { admin: this.list[id].url + "admin/" + id,
  voters: this.list[id].url + "voters/" + id }
};

allPolls.prototype.findById = function (id) {
  return this.list[id];
};

module.exports = allPolls;
