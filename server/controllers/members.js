const members = require("../modules/members");

module.exports = {
    add: (data, id, callback) => {
        members.add(data,id,callback);
    },

    addSocketIdAndOnlineMode: (idMember, idSocket) => {
        return members.addSocketIdAndOnlineMode(idMember, idSocket);
    },

    getAllMembers: async() => {
        return members.getAll();
    },

    getAllMembersWithMyConversations: async(myId) => {
        return members.getAllMembersWithMyConversations(myId);
    },

    disconnect: (id, callback) => {
        members.disconnect(id, callback);
    },

    idIsValid: (id) => {
        return members.idIsValid(id);
    },

    getById: (id) => {
        return members.getById(id);
    }
};