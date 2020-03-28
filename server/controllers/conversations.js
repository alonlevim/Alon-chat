const conversations = require("../modules/conversations");

module.exports = {
    push: (message, fromId, toId, callback) => {
        conversations.push(message, fromId, toId, callback);
    },

    getConversations: (id_1, id_2) => {
        return conversations.getConversations(id_1, id_2);
    },

    readMessage: (id, from, to) => {
        return conversations.readMessage(id, from, to);
    }
};