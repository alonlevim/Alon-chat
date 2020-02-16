import socketIOClient from "socket.io-client";
import * as events from './eventsString';

const PORT = 4000;
let socket = null;

export default
{
    connect(connectionCallback, conversionsCallback) {
        socket = socketIOClient(`http://localhost:${PORT}`);

        socket.on(events.CONNECTION, () => connectionCallback && connectionCallback());

        socket.on(events.GET_MESSAGE, (conversions) => { console.log({conversions}); conversionsCallback(conversions)} );
    },

    logout(id, callback) {
        socket.emit(events.LOG_OUT, id, () => callback && callback());
    },


    signIn(id, callback) {
        socket.emit(events.ALL_DATA, id, (status, data) => callback && callback(status, data));
    },

    registration(name, callback) {
        socket.emit(events.REGISTRATION, {name}, (status, data) => callback && callback(status, data));
    },

    getConversionWithMember(data, callback) {
        socket.emit(events.GET_CONVERSION_WITH_MEMBER, data, (status, data) => callback && callback(status, data));
    },

    sendMessage(data, callback) {
        socket.emit(events.SEND_MESSAGE, data, (status, data) => callback && callback(status, data));
    }
};