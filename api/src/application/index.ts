import health from './healthController';
import postMessage from './storeMessageController';
import putMessage from './replaceMessageController';
import getMessageDates from './fetchMessageDateController';
import getMessageLeader from './fetchMessageLeaderController';
import getMessageType from './fetchMessageTypeController';
import getMessageValid from './fetchMessageValidController';

export default {
    health,
    postMessage,
    putMessage,
    getMessageDates,
    getMessageLeader,
    getMessageType,
    getMessageValid
};

