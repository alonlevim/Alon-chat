import socketIOClient from "socket.io-client";
import * as events from './eventsString';

const PORT = 4000;
let socket = null;

export default
{
    connect(connectionCallback, conversionsCallback, allDataCallback) {
        socket = socketIOClient(`http://localhost:${PORT}`);

        socket.on(events.CONNECTION, () => connectionCallback && connectionCallback());

        socket.on(events.GET_MESSAGE, (conversions) => { conversionsCallback && conversionsCallback(conversions)} );

        socket.on(events.ALL_DATA, (data) => { allDataCallback && allDataCallback(data)} );
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

    getConversionWithMember(data, callback) {
        socket.emit(events.GET_CONVERSION_WITH_MEMBER, data, (status, data) => callback && callback(status, data));
    },

    sendMessage(data, callback) {
        socket.emit(events.SEND_MESSAGE, data, (status, data) => callback && callback(status, data));
    }
};