const conversions = require("../modules/conversions");

module.exports = {
    push: (message, fromId, toId, callback) => {
        conversions.push(message, fromId, toId, callback);
    },

    getConversions: (id_1, id_2) => {
        return conversions.getConversions(id_1, id_2);
    },
};