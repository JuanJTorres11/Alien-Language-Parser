import { getMessagesType } from "./../repository";
import Message from "./../domain/message";

async function getMessages(type: string): Promise<[boolean, Message[]]> {
  const messages = await getMessagesType(type);
  if (messages.length == 0) {
    return [false, []]
  } else {
    return [true, messages[0].messages]
  }
}

export default {
  getMessages
};
