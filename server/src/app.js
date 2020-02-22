const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
require('dotenv').config({path: './server/src/.env'});

require("./socketEvents")(io);

const PORT = typeof process.env.NODE_ENV === "undefined" || process.env.NODE_ENV.trim() !== "production" || typeof process.env.PORT === "undefined" ? 4000 : process.env.PORT.trim();
const DATABASE = "alon-chat";


app.use('/images', express.static(path.join(__dirname, '../assets')));
if (typeof process.env.NODE_ENV !== "undefined" && process.env.NODE_ENV.trim() === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, '../../client/build')));

    // Handle React routing, return all requests to React app
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
    });
}

http.listen(PORT, function () {
    console.log(`listening on *:${PORT}`);
});

mongoose.connect(`mongodb://localhost/${DATABASE}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});