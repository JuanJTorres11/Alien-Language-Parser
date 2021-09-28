import { saveMessage } from './../repository'

async function verifyMessage(msg: string, id?: string): Promise<[boolean, string]> {
  const words = msg.trim().split(" ");
  const leader = verifySender(words);
  let invalid_reason = ""
  if (!leader[0]) {
    invalid_reason = leader[1];
    const res = await saveMessage(msg, false, null, null, invalid_reason, id);
    return [res, "INVALID MESSAGE: " + invalid_reason];
  }

  const valid = verifyWordValidity(words);
  if (!valid) {
    invalid_reason = "Words do not have only 3 consonants";
    const res = await saveMessage(msg, false, null, null, invalid_reason, id);
    return [res, "INVALID MESSAGE: " + invalid_reason];
  }

  const type = verifyType(words);
  if (type[0] == "A") {
    invalid_reason = type;
    const res = await saveMessage(msg, false, null, null, invalid_reason, id);
    return [res, "INVALID MESSAGE: " + invalid_reason];
  }

  const res = await saveMessage(msg, true, type, leader[1], invalid_reason, id);
  return [res, `Message from ${leader[1]} of type ${type}`];
}

function verifySender(words: string[]): [boolean, string] {
  const leader = words[0][0];
  if (words.length == 1) {
    return [false, "Not a set of words"];
  }
  const valid = words.every(word => word[0] == leader);

  if (valid) {
    return [true, leader];
  } else {
    return [false, "Distracting message"];
  }
}

function verifyWordValidity(words: string[]): boolean {
  return words.every(word => word.slice(1).match(/[^aeiou]/g).length == 3);
}

function verifyType(words: string[]): string {
  const types: string[] = words.map(word => {
    const consonants = word.slice(1).match(/[^aeiou]/g);
    if (consonants[0] > consonants[1] && consonants[1] > consonants[2]) {
      return "WARNING"
    } else if (consonants[0] < consonants[1] && consonants[1] < consonants[2]) {
      return "DANGER"
    }
    return "INFO";
  });
  return types.reduce((prev, curr) => prev == curr ? curr : "All words are not from the same type");
}

export default {
  verifyMessage
};
