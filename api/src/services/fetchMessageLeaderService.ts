import { getMessagesLeader } from "./../repository";
import Message from "./../domain/message";

async function getMessages(leader: string): Promise<[boolean, Message[]]> {
  const messages = await getMessagesLeader(leader);
  if (messages.length == 0) {
    return [false, []]
  } else {
    return [true, messages[0].messages]
  }
}

export default {
  getMessages
};
