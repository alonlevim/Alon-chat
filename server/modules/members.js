const Member = require("../schemas/member");
const conversation = require("./conversations");

module.exports = {
    add: (data, id, callback) => {
        if (data.name.trim() === "") {
            // Empty name
            callback("ERROR", "empty");
            return;
        }

        const memberObject = {
            socketId: [id],
            name: data.name,
            date: new Date(),
            online: true,
            lastLogin: new Date(),
            image: "/images/1.jpg"
        };

        const newMember = new Member(memberObject);

        newMember.save().then((member) => {
            // Add member id
            memberObject._id = member._id;
            callback("OK", memberObject);
        }).catch(() => callback("ERROR", "can't save in DB"));
    },

    addSocketIdAndOnlineMode: (idMember, idSocket) => {
        return Member.findById(idMember)
        .then( m => {
            m.socketId.push(idSocket);
            m.online = true;

            m.save().catch(()=>{
                console.log("can't append socket-id to member");
            });
        }).catch(()=>{
            console.log("can't find member to update socket-id");
        });
    },

    getById: async (id) => {
        return Member.findById(id).then((member) => {
            const memberObject = {
                _id: id,
                name: member.name,
                date: member.date,
                online: member.online,
                lastLogin: member.lastLogin,
                image: member.image,
                socketId: member.socketId
            };

            return { status: "OK", member: memberObject };
        }).catch(() => {
            return { status: "FAIL" };
        });
    },

    getAll: async () => {
        return Member.find().then((members)=>members).catch((error)=>null);
    },

    getAllMembersWithMyConversations: async (id) => {
        const results = await Member.find();
        
        const newResults = results.map(async member => {
            const newMember = {...member._doc};
            newMember.conversation = await conversation.getConversations(id, member._id).then(data => data != null && typeof data.result !== "undefined" && data.result != null && typeof data.result.messages !== "undefined" ? data.result.messages : []);
            
            return newMember;
        });

        return await Promise.all(newResults);
    },

    disconnect: (id, callback) => {
        const filter = { socketId: id };
        Member.findOne(filter).then(member => {
            member.online = false;
            member.lastLogin = new Date();

            member.save();

            callback(member._id);
        });
    },

    idIsValid: (id) => {
        return Member.findById(id).then(() => true).catch(() => false);
    }
};