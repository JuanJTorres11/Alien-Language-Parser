import { getMessage } from './../repository'
import services from './index';

async function putMessage(oldMsg:string, newMsg: string): Promise<[boolean, string]> {
  const messageRetrieved = await getMessage(oldMsg);
  if ((Date.now() - messageRetrieved?.createdAt.getTime())/60000 < 5) {
    return await services.postMessageService.verifyMessage(newMsg, messageRetrieved.id);
  } else {
    return [false, "More than 5 minutes have passed"];
  }
}

export default {
  putMessage
};
