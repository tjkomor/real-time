var socket = io();
var parsedUrl = window.location.href.split('/');
var id = parsedUrl[parsedUrl.length - 1];

socket.on(id, function(voteCount) {
  var responseCount = $('td:not(class)').length
  for( var i = 0; i < responseCount; i++) {
    if (voteCount[i] !== undefined){
      $('.' + i).text(voteCount[i]);
    } else {
      $('.' + i).text(0);
    }
  }
})


$('.close-poll').on('click', function() {
  this.style.display = "none";
  $('.poll-closed').show();
  socket.send("close-poll", {pollId: id});
});
