const events = require("../../eventsString");
const Members = require("../controllers/members");
const Conversions = require("../controllers/conversions");

module.exports = (io) => {
    io.on(events.CONNECTION, async function (socket) {
        console.log('a member connected');

        socket.on(events.ALL_DATA, async function (id, callback) {
            console.log(events.ALL_DATA, id);

            const valid = await Members.idIsValid(id);
            let status = "OK";

            if (valid) {
                await Members.addSocketId(id, socket.id);
                const member = await Members.getById(id);

                if (member.status === "OK") {
                    const members = await Members.getAllMembers();
                    callback(status, {
                        myDetails: member.member,
                        members
                    });
                }
                else {
                    status = "FAil";
                    const message = "member not valid";
                    callback(status, message);
                }
            }
            else {
                status = "FAil";
                const message = "member not valid";
                callback(status, message);
            }
        });

        socket.on(events.REGISTRATION, function (data, callback) {
            if (data == null || callback == null) {
                callback && callback("ERROR", "data is not legal");
                return;
            }

            // Create Members
            Members.add(data, socket.id, async (status, newMember) => {
                if (status === "OK") {
                    // Add to chat room
                    socket.join(events.NAME_CHAT);
                    // Send back to client all data
                    const members = await Members.getAllMembers();

                    callback(
                        status,
                        {
                            myDetails: newMember,
                            members
                        });

                    // Sent to all members new data
                    io.to(events.NAME_CHAT).emit(events.ALL_DATA, members);
                }
            });
        });

        socket.on(events.DISCONNECT, function () {
            console.log(events.DISCONNECT);

            // Change member to offline
            Members.disconnect(socket.id, async() => {
                // Broadcast to all chat room
                const members = await Members.getAllMembers();
                io.to(events.NAME_CHAT).emit(events.ALL_DATA, members);

            });
        });

        socket.on(events.LOG_OUT, function (id, callback) {
            console.log(events.LOG_OUT);

            Members.disconnect(socket.id, async() => {
                socket.leave(events.NAME_CHAT);

                const members = await Members.getAllMembers();
                io.to(events.NAME_CHAT).emit(events.ALL_DATA, members);

                callback && callback();
            });
        });

        socket.on(events.GET_CONVERSION_WITH_MEMBER, async function (data, callback) {
            if (data == null || callback == null)
                return;

            console.log(`${events.GET_CONVERSION_WITH_MEMBER} data.myId: ${data.myId} data.withId: ${data.withId}`);
            const conversions = await Conversions.getConversions(data.myId, data.withId);
            if (conversions.status === "OK") {
                callback && callback("OK", conversions.result ? conversions.result : []);
            }
            else {
                callback && callback("Fail", []);
            }
        });

        socket.on(events.SEND_MESSAGE, function (data, callback) {
            if (
                data == null
                ||
                callback == null
                ||
                typeof data.message === "undefined"
                ||
                typeof data.from === "undefined"
                ||
                typeof data.to === "undefined"
            )
                return;

            const { message, from, to } = data;
            Conversions.push(message, from, to, async (status, error) => {
                if (status === "OK") {
                    const newConversion = await Conversions.getConversions(from, to);

                    // Get socket id of getter message
                    const getterMember = await Members.getById(to);

                    getterMember.member.socketId.length && getterMember.member.socketId.map(socketId => io.to(socketId).emit(events.GET_MESSAGE, newConversion));

                    callback && callback(newConversion.status, newConversion.result);
                }
                else {
                    callback && callback("Fail", error);
                }
            });
        });
    });
};