const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const http = require('http').createServer(app);
const io = require('socket.io')(http);

require("./socketEvents")(io);

const PORT = 4000;
const DATABASE = "alon-chat";


app.use('/images', express.static(path.join(__dirname, '../assets')));

http.listen(PORT, function () {
    console.log(`listening on *:${PORT}`);
});

mongoose.connect(`mongodb://localhost/${DATABASE}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});