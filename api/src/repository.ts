import { getRepository } from "typeorm";
import InvalidMessage from "./domain/invalid_message";
import Leader from "./domain/leader";
import Message from './domain/message'
import Type from "./domain/type";
import logger from "./logger";

async function saveMessage(msg: string, valid: boolean, type?: string, leader?: string, invalid?: string): Promise<boolean> {
    let message = new Message(msg, valid);
    if (valid) {
        message.type = await getRepository(Type).findOneOrFail({ value: type })
            .catch(() =>
                message.type = new Type(type));
        message.leader = await getRepository(Leader).findOneOrFail({ name: leader })
            .catch(() =>
                message.leader = new Leader(leader));
    } else {
        message.invalidReason = await getRepository(InvalidMessage).findOneOrFail({ reason: invalid })
            .catch(() =>
                message.invalidReason = new InvalidMessage(invalid));
    }
    await getRepository(Message).save(message).catch(error => {
        logger.error(error)
        return false;
    });
    return true;
}

export {
    saveMessage
}