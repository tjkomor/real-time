const _ = require('lodash');

function Poll(poll) {
  this.url             = poll.url;
  this.question = poll.question;
  this.responses       = poll.responses;
  this.open            = true;
}

module.exports = Poll;
