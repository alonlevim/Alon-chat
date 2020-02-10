const members = require("../modules/members");

module.exports = {
    add: (data, id, callback) => {
        members.add(data,id,callback);
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

    getById: (id, socketId) => {
        return members.getById(id, socketId);
    }
};