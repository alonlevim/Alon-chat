const Conversion = require("../schemas/conversion");

module.exports = {
    push: async (dataMessage, fromId, toId, callback) => {
        const messageObject = {
            from: fromId,
            to: toId,
            content: dataMessage.message,
            date: new Date()
        };

        callback(getConversions(fromId, toId));
    },

    getConversions: async(id_1, id_2) => {
        return Conversion.findOne({between: [id_1,id_2]}).then((data) => {return { status: "OK", result: data }}).catch((error) => {return { status: "FAIL" }});
    }
};