import { getRepository, Between } from "typeorm";
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

async function getMessagesDates(date1: Date, date2: Date): Promise<Message[]> {
    return await getRepository(Message).find({ createdAt: Between(date1, date2) });
}

async function getMessagesLeader(leaderName: string) {
    return await getRepository(Leader).find({
        relations: ["messages"],
        where: {
            name: leaderName,
        },
    });
}

async function getMessagesType(type: string) {
    return await getRepository(Type).find({
        relations: ["messages"],
        where: {
            value: type,
        },
    });
}

async function getMessagesValid(valid: boolean) {
    if (valid) {
        return await getRepository(Message).find({
            valid: true
        });
    } else {
        return await getRepository(Message).find({
            relations: ["invalidReason"],
            where: {
                valid: false
            },
        });
    }

}

export {
    saveMessage,
    getMessagesDates,
    getMessagesLeader,
    getMessagesType,
    getMessagesValid
}