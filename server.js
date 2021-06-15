const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
require('dotenv').config();
require('./config/database');

let users = []
io.on('connection', socket => {
  console.log("Hello from the Server! Socket ID: "+socket.id);
  users.push(socket.id)
  io.emit("userList", users)
  console.log("Users afters connection: ", users)

  socket.on("updateUsers", () => {
    io.emit("userList", users)
  })

  socket.on("newMessage", newMessage => {
    console.log(("Just arrived: ", newMessage));
    io.emit("newMessage", newMessage)
  })
  
  socket.on("disconnect", () => {
      users = users.filter(user => user !== socket.id)
      io.emit("userList", users)
      console.log("Users after disconnection: ", users);
  })
})


app.use(logger('dev'));
app.use(express.json());
// must be configured to serve from the build folder
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

// Middleware to verify token and assign user object to req.user
// Be sure to mount before routes
app.use(require('./config/checkToken'));

// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'));

// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX requests
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3001;


/* app.listen(port, function() {
  console.log(`Express app running on port ${port}`);
}); */

server.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`);
});