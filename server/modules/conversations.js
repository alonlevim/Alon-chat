const Conversation = require("../schemas/conversation");
const mongoose = require('mongoose');

const sortIdsToArray = (id_1, id_2) => {
    return [id_1, id_2].sort();
};

const createConversationBetweenTwoMembers = (id_1, id_2) => {
    const newConversation = new Conversation({
        between: sortIdsToArray(id_1, id_2),
        messages: []
    });
    
    return newConversation.save().then(conversation => {return {status: "OK" , _id: conversation._id} }).catch(()=>{ return {status:"Fail"} });
};

const getOrCreateIdOfConversationBetweenTwoMembers = (id_1, id_2) => {
    return Conversation.findOne({between: sortIdsToArray(id_1,id_2) })
    .then(async(data) => {
        if( data != null ) {
            return {status: "OK", _id: data._id};
        }

        const newConversation = await createConversationBetweenTwoMembers(id_1, id_2);
        if( newConversation.status === "OK" ) {
            return {status: "OK", _id: newConversation._id};
        }
        else
        {
            return {status: "Fail", error: "can't create new conversation between two members"};
        }
    } )
    .catch((error) => {
        return {status: "Fail", error: "can't find or create new conversation between two members"};
    });
};

module.exports = {
    push: async (message, fromId, toId, callback) => {
        const conversationBetweenTwoMembersDB = await getOrCreateIdOfConversationBetweenTwoMembers(fromId, toId);
        
        if( conversationBetweenTwoMembersDB.status === "OK" ) {
            const conversation = await Conversation.findById(conversationBetweenTwoMembersDB._id);
            
            const messageObject = {
                from: fromId,
                to: toId,
                content: message,
                date: new Date()
            };

            conversation.messages.push(messageObject);
            conversation.save().then((list)=>{
                // Last added
                const item = list.messages[list.messages.length -1];
                
                callback && callback("OK", null, item);
            }).catch(()=>{
                callback && callback("Fail", "can't save conversation", null);
            });
        }
        else{
            callback && callback("Fail", conversationBetweenTwoMembersDB.error, null);
        }
    },

    getConversations: (id_1, id_2) => {
        const ids = sortIdsToArray(mongoose.Types.ObjectId(id_1), mongoose.Types.ObjectId(id_2));

        return Conversation.findOne({between: ids}).then((data) => {return { status: "OK", result: data }}).catch((error) => {return { status: "FAIL" }});
    },

    readMessage: (id, from, to) => {
        // Order ids
        const ids = sortIdsToArray(mongoose.Types.ObjectId(from), mongoose.Types.ObjectId(to));
        // find and update message as saw
        return Conversation.findOne({between: ids}).then((conversation)=>{
            const newMessage = [...conversation.messages];
            // Update message as saw
            newMessage.forEach((item)=>{
                if( item._id.toString() === id )
                    item.saw = true;
            });
            // reassign new message list
            conversation.messages = newMessage;
            // save
            conversation.save();
        });
    }
};