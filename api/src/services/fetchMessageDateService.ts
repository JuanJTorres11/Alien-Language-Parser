import { getMessagesDates } from "./../repository";
import Message from "./../domain/message";

async function getMessages(date1: Date, date2: Date): Promise<[boolean, Message[]]> {
  const messages = await getMessagesDates(date1, date2);
  if (messages.length == 0) {
    return [false, []]
  } else {
    return [true, messages]
  }
}

export default {
  getMessages
};
