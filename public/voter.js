var socket = io();
var parsedUrl = window.location.href.split('/');
var id = parsedUrl[parsedUrl.length - 1];
var vote = {pollId: id};

socket.send("latestgetVoteData", {pollId: id});

$('button').on('click', function() {
  var responseTitle = this.innerHTML;
  vote["voteId"] = this.className;
  $('.responses').hide();
  $('.submitted').show();
  $('h3').append("Your vote <em>'" + responseTitle +
                         "'</em> has been submitted!");
  socket.send("voteResponse", vote)
});

socket.on(id, function(getVoteData) {
  var responseCount = $('td:not(class)').length;
  $('.total').text(`Total Votes: ` + getVoteData.total)
  for( var i = 0; i < responseCount; i++) {
    if (getVoteData.votes[i] !== undefined){
      $('.stats' + i).text(getVoteData.votes[i]);
    } else {
      $('.stats' + i).text(0);
    }
  }
});

socket.on("close-" + vote.pollId, function(message) {
  if(message.open === false){
    $('.well').hide();
    $('.poll-closed').show();
  }
});
