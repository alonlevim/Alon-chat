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
                    const members = await Members.getAllMembersWithMyConversations(id);

                    // Update all chat
                    io.to(events.NAME_CHAT).emit(events.MEMBER_ONLINE, id);

                    callback(status, {
                        myDetails: member.member,
                        members: members.filter(member => member._id != id)
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

                    // Send to all chat that member is online
                    newMember.conversation = [];
                    io.to(events.NAME_CHAT).emit(events.ADDED_MEMBER, newMember);

                    callback(
                        status,
                        {
                            myDetails: newMember,
                            members
                        });
                }
            });
        });

        socket.on(events.DISCONNECT, function () {
            console.log(events.DISCONNECT);
            // Leave group
            socket.leave(events.NAME_CHAT);

            // Change member to offline
            Members.disconnect(socket.id, async (idMember) => {

                // Send to all chat that member is offline
                io.to(events.NAME_CHAT).emit(events.MEMBER_OFFLINE, idMember._id);
            });
        });

        socket.on(events.LOG_OUT, function (id, callback) {
            console.log(events.LOG_OUT);

            Members.disconnect(socket.id, async () => {
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

            console.log(`${events.SEND_MESSAGE} from: ${data.from} to: ${data.to} message: ${data.message}`);

            const { message, from, to } = data;
            Conversations.push(message, from, to, async (status, error, dataAfterSaved) => {
                if (status === "OK") {
                    //const newConversation = await Conversations.getConversations(from, to);

                    // Get socket id of receiving message
                    const receivingMessage = await Members.getById(to);

                    // Send to receiving member the message
                    receivingMessage.member.socketId.length && receivingMessage.member.socketId.map(socketId => io.to(socketId).emit(events.GET_MESSAGE, dataAfterSaved));

                    callback && callback(status, null, dataAfterSaved);
                }
                else {
                    callback && callback(status, error);
                }
            });
        });
    });
};