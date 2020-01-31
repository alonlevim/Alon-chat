const express = require('express');
const path = require('path');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = 4000;

app.use('/images', express.static(path.join(__dirname, '../assets')));

app.get('/', function (req, res) {
    res.send('<h1>Hello world</h1>');
});

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

    socket.on('all data', function (socket) {
        console.log('all data');
        io.emit('all data', {
            users: [
                {
                    id: 1,
                    name: "Alon Levi",
                    image: "http://localhost:4000/images/1.jpg",
                    shortText: "Lorem Ipsum is simply dummy text of the",
                    time: "9:30 PM",
                    online: true
                },
                {
                    id: 2,
                    name: "Messi",
                    image: "http://localhost:4000/images/2.jpg",
                    shortText: "Lorem Ipsum is simply dummy text of the",
                    time: "9:30 PM",
                    online: false
                },
                {
                    id: 3,
                    name: "Test",
                    image: "http://localhost:4000/images/3.jpg",
                    shortText: "Test Conversion",
                    time: "10:30 PM",
                    online: false
                }
            ]
        });
    });
});

http.listen(PORT, function () {
    console.log(`listening on *:${PORT}`);
});