const Poll = require('./poll')
const createId = require('./create-id');
const _ = require('lodash');

function pollDatabase(){
  this.list = {};
}

pollDatabase.prototype.newPoll = function (pollData) {
  var id = createId();
  this.list[id] = new Poll(pollData);
  return id;
};

pollDatabase.prototype.urls = function (id) {
  return { admin: this.list[id].url + "admin/" + id,
          voters: this.list[id].url + "voters/" + id }
};

pollDatabase.prototype.findById = function (id) {
  return this.list[id];
};

pollDatabase.prototype.getVoteData = function (id) {
  var poll = this.findById(id);
  var total = _.sum(_.values(poll.votes));
  return {total: total, votes: poll.votes}
};

pollDatabase.prototype.addVote = function (pollId, voteId) {
  if(this.findById(pollId)) {
    var poll = this.findById(pollId)
    poll.addVote(voteId);
  }
};

pollDatabase.prototype.closePoll = function (id) {
  if(this.findById(id)) {
    this.findById(id).open = false;
  }
};

module.exports = pollDatabase;
