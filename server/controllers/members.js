const members = require("../modules/members");

module.exports = {
    add: (data, id, callback) => {
        members.add(data,id,callback);
    },

    addSocketId: (idMember, idSocket) => {
        return members.addSocketId(idMember, idSocket);
    },

    getAllMembers: async() => {
        return members.getAll();
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