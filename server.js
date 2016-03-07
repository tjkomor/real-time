const http = require('http');
const express = require('express');
const app = express();
const lodash = require('lodash');
const exphbs  = require('express-handlebars');

const port = process.env.PORT || 3000;

const server = http.createServer(app)
.listen(port, function(){
  console.log('Listening on port ' + port + '.');
});

const socketIo = require('socket.io');
const io = socketIo(server);

const generateId = require('./lib/create-id');

var polls = {};

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'))

app.get("/", function(request, response){
  response.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function (socket) {
  socket.on('message', function(channel, message){
    if(channel == "createPoll"){
      var id = generateId();
      createPoll(message, id);
      socket.emit('webAddresses', generateAddresses(id));
    }
  });
});

app.get('/voters/:id', (request, response) => {
  var id = request.params.id
  var question = polls[request.params.id].question;
  var responses = polls[request.params.id].responses;

  response.render('admin', {id, question, responses})
});



function createPoll(message, id){
  polls[id] = message;
}

function generateAddresses(id){
  if (port === 3000){
    return { admin: "http://localhost:3000/admin/" + id,
    voters: "http://localhost:3000/voters/" + id,
  }
} else {
  return { admin: "https://#/admin/" + id,
  voters: "https://#/voters/" + id,
}
}
}

module.exports = server;
