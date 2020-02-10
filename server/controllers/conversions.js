const conversions = require("../modules/conversions");

module.exports = {
    push: (dataMessage, fromId, toId, callback) => {
        conversions.push(dataMessage, fromId, toId, callback);
    },

    getConversions: (id_1, id_2) => {
        return conversions.getConversions(id_1, id_2);
    },
};