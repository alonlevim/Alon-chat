const events = require("../eventsString");
const Members = require("../controllers/members");
const Conversations = require("../controllers/conversations");

module.exports = (io) => {
    io.on(events.CONNECTION, async function (socket) {
        console.log('a member connected');

        socket.on(events.SIGN_IN, async function (id, callback) {
            console.log(events.SIGN_IN, id);

            const valid = await Members.idIsValid(id);
            let status = "OK";

            if (valid) {
                socket.join(events.NAME_CHAT);
                await Members.addSocketIdAndOnlineMode(id, socket.id);
                const member = await Members.getById(id);

                if (member.status === "OK") {
                    const members = await Members.getAllMembers();
                    
                    // Update all chat
                    io.to(events.NAME_CHAT).emit(events.ALL_DATA, members);
                    
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
            // Leave group
            socket.leave(events.NAME_CHAT);

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

        socket.on(events.GET_CONVERSATION_WITH_MEMBER, async function (data, callback) {
            if (data == null || callback == null)
                return;

            console.log(`${events.GET_CONVERSATION_WITH_MEMBER} data.myId: ${data.myId} data.withId: ${data.withId}`);
            const conversations = await Conversations.getConversations(data.myId, data.withId);
            if (conversations.status === "OK") {
                callback && callback("OK", conversations.result ? conversations.result : []);
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
            Conversations.push(message, from, to, async (status, error) => {
                if (status === "OK") {
                    const newConversation = await Conversations.getConversations(from, to);

                    // Get socket id of getter message
                    const getterMember = await Members.getById(to);

                    getterMember.member.socketId.length && getterMember.member.socketId.map(socketId => io.to(socketId).emit(events.GET_MESSAGE, newConversation));

                    callback && callback(newConversation.status, newConversation.result);
                }
                else {
                    callback && callback("Fail", error);
                }
            });
        });
    });
};