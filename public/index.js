var socket = io();
var poll = {url: window.location.href}; //add Sharing: true/false, Active: true/false
var responses = {};
var responseId = 0;

$('#add-poll').on('click', function(){
  var polling = $('#poll-question');
  poll["question"] = polling.val().split(/[<>]/).join('');
  $('.poll').append('<h3>' + poll["question"] + '</h3>');
  polling.val('')
  $('.add-poll').hide();
  $('.add-responses').show();
});

$('#add-response').on('click', function() {
  $('.current-poll').show();
  var response = $('#response');
  responses[responseId]= response.val().split(/[<>]/).join('');
  responseId++;
  $('.response-list').append('<li>' + response.val().split(/[<>]/).join('') + '</li>');
  response.val('');
});

$('#submit-poll').on('click', function() {
  poll["responses"] = responses;
  socket.send('createPoll', poll);
  $('.add-responses').hide();
  $('#share-stats').hide();
  this.style.display = "none";
  poll = {};
  responseId = 0;
});

socket.on('webAddresses', function (addresses) {
  $('.web-addresses').show();
  $(".admin").append("Admin View: <a href='" + addresses["admin"] +"'>" + addresses["admin"] + "</a>")
  $(".voters").append("Voter View: <a href='" + addresses["voters"] +"'>" + addresses["voters"] + "</a>")
});

$('#share-stats').on('click', function() {
  this.style.display = "none";
  $('#stats-shared-message').show();
  poll["shareStats"] = true;
});
