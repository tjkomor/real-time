const _ = require('lodash');

function Poll(poll) {
  this.url             = poll.url;
  this.question        = poll.question;
  this.responses       = poll.responses;
  this.open            = true;
  this.votes           = getVoteCount(poll.responses);
  this.pollStatus      = poll.pollStatus || false;
}

Poll.prototype.addVote = function (voteId) {
  if(this.votes[voteId] != undefined) {
    this.votes[voteId]++;
  }
  return this.votes;
};

function getVoteCount (responses) {
  var voteCount = {};
  _.forEach(responses, function(value, key){
    voteCount[key] = 0;
  });
  return voteCount;
};

module.exports = Poll;
