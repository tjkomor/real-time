const http = require('http');
const express = require('express');
const app = express();
const _ = require('lodash');
const exphbs  = require('express-handlebars');

const port = process.env.PORT || 3000;

const server = http.createServer(app)
              .listen(port, function(){
               console.log('Listening on port ' + port + '.');
              });

const socketIo = require('socket.io');
const io = socketIo(server);

const pollDatabase = require('./lib/pollDatabase');

var polls = new pollDatabase();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

pry = require('pryjs');

app.use(express.static('public'))

app.get("/", function(request, response){
 res.sendFile(__dirname + '/public/index.html');
});

app.get('/voters/:id', (request, response) => {
  var pollId = request.params.id;
  response.render('voter', polls.findById(pollId));
});

app.get('/admin/:id', (request, response) => {
  var pollId = request.params.id
  response.render('admin', polls.findById(pollId))
});


io.on('connection', function (socket) {
  socket.on('message', function(channel, message){
    checkChannel(channel, message, socket)
  });
});

function checkChannel(channel, message, socket) {
  if(channel === "createPoll"){
    var id = polls.newPoll(message);
    socket.emit('webAddresses', polls.urls(id));
  } else if (channel === "voteResponse") {
    polls.addVote(message.pollId, message.voteId)
    io.sockets.emit(message.pollId, polls.getVoteData(message.pollId));
  } else if (channel === "latestgetVoteData"){
    io.sockets.emit(message.pollId, polls.getVoteData(message.pollId));
  } else if (channel === "close-poll"){
    polls.closePoll(message.pollId)
    io.sockets.emit("close-" + message.pollId, {open: false});
  }
}

module.exports = server;
