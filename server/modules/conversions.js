const Conversion = require("../schemas/conversion");
const mongoose = require('mongoose');

const createConversionBetweenTwoMembers = (id_1, id_2) => {
    const newConversion = new Conversion({
        between: [id_1, id_2].sort(),
        messages: []
    });
    
    return newConversion.save().then(conversion => {return {status: "OK" , _id: conversion._id} }).catch(()=>{ return {status:"Fail"} });
};

const getOrCreateIdOfConversionBetweenTwoMembers = (id_1, id_2) => {
    return Conversion.findOne({between: {$in : [id_1,id_2] }})
    .then(async(data) => {
        console.log({data, id_1, id_2}) 
        if( data != null ) {
            return {status: "OK", _id: data._id};
        }

        const newConversion = await createConversionBetweenTwoMembers(id_1, id_2);
        if( newConversion.status === "OK" ) {
            return {status: "OK", _id: newConversion._id};
        }
        else
        {
            return {status: "Fail", error: "can't create new conversion between two members"};
        }
    } )
    .catch((error) => {
        return {status: "Fail", error: "can't find or create new conversion between two members"};
    });
};

module.exports = {
    push: async (message, fromId, toId, callback) => {
        const conversionBetweenTwoMembersDB = await getOrCreateIdOfConversionBetweenTwoMembers(fromId, toId);
        
        if( conversionBetweenTwoMembersDB.status === "OK" ) {
            const conversion = await Conversion.findById(conversionBetweenTwoMembersDB._id);
            
            const messageObject = {
                from: fromId,
                to: toId,
                content: message,
                date: new Date()
            };

            conversion.messages.push(messageObject);
            conversion.save().then(()=>{
                callback && callback("OK");
            }).catch(()=>{
                callback && callback("Fail", "can't save conversion");
            });
        }
        else{
            callback && callback("Fail", conversionBetweenTwoMembersDB.error);
        }
    },

    getConversions: (id_1, id_2) => {
        const ids = [mongoose.Types.ObjectId(id_1), mongoose.Types.ObjectId(id_2)].sort();

        return Conversion.findOne({between: ids}).then((data) => {return { status: "OK", result: data }}).catch((error) => {return { status: "FAIL" }});
    }
};