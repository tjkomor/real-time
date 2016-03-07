var socket = io();
var parsedUrl = window.location.href.split('/');
var id = parsedUrl[parsedUrl.length - 1];

socket.send("latestgetVoteData", {pollId: id});

socket.on(id, function(getVoteData) {
  var responseCount = $('td:not(class)').length;
  $('.total').text(`Total Votes: ` + getVoteData.total)
  checkVoteDataVotes(getVoteData, responseCount);
});

function checkVoteDataVotes (voteData, responseCount) {
  for( var i = 0; i < responseCount; i++) {
    if (voteData.votes[i]){
      $('.' + i).text(getVoteData.votes[i]);
    } else {
      $('.' + i).text(0);
    }
  }
}

$('.close-poll').on('click', function() {
  this.style.display = "none";
  $('.poll-closed').show();
  socket.send("close-poll", {pollId: id});
});
