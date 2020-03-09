import socketIOClient from "socket.io-client";
import * as events from './eventsString';

let PORT = 4000;
let socket = null;

export default
{
    modeDevelopment(modeDevelopmentFlag) {
        PORT = !modeDevelopmentFlag ? null : PORT;
    },

    connect(callbacks) {
        const {connect, getMessage, updateData, memberOnline, memberOffline} = callbacks;
        socket = socketIOClient(PORT ? `http://localhost:${PORT}` : '/');

        socket.on(events.CONNECTION, () => connect && connect());

        socket.on(events.GET_MESSAGE, (conversations) => { getMessage && getMessage(conversations)} );

        socket.on(events.ALL_DATA, (data) => { updateData && updateData(data)} );

        socket.on(events.MEMBER_ONLINE, (data) => { memberOnline && memberOnline(data)} );
        
        socket.on(events.MEMBER_OFFLINE, (data) => { memberOffline && memberOffline(data)} );
    },

    logout(id, callback) {
        socket.emit(events.LOG_OUT, id, () => callback && callback());
    },


    signIn(id, callback) {
        socket.emit(events.SIGN_IN, id, (status, data) => callback && callback(status, data));
    },

    registration(name, callback) {
        socket.emit(events.REGISTRATION, {name}, (status, data) => callback && callback(status, data));
    },

    getConversationWithMember(data, callback) {
        socket.emit(events.GET_CONVERSATION_WITH_MEMBER, data, (status, data) => callback && callback(status, data));
    },

    sendMessage(data, callback) {
        socket.emit(events.SEND_MESSAGE, data, (status, data) => callback && callback(status, data));
    }
};