import { types } from "util";


async function verifyMessage(msg: string): Promise<string> {
  const words = msg.trim().split(" ");
  const leader = verifySender(words);
  if (leader[1] != "")
    return leader[1];
  const valid = verifyWordValidity(words);
  if (!valid) {
    return "Words do not have only 3 consonants";
  }
  const type = verifyType(words);
  if (type[0] == "A") {
    return type;
  }
  return `Message from ${leader[0]} of type ${type}`;
}

function verifySender(words: string[]): string[] {
  const leader = words[0][0];
  let reason = "";
  if (words.length == 1) {
    reason = "Not a set of words";
    return ["", reason];
  }
  words.forEach(word => {
    if (word[0] != leader) {
      reason = "Distracting message";
      return ["", reason];
    }
  });
  return [leader, reason];
}

function verifyWordValidity(words: string[]): boolean {
  words.forEach(word => {
    if (word.slice(1).match(/[^aeiou]/g).length != 3) {
      return false;
    }
  });
  return true;
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
