import { getMessagesValid } from "./../repository";
import Message from "./../domain/message";

async function getMessages(valid: boolean): Promise<[boolean, Message[]]> {
  const messages = await getMessagesValid(valid);
  if (messages.length == 0) {
    return [false, []]
  } else {
    return [true, messages]
  }
}

export default {
  getMessages
};
