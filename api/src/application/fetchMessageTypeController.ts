import { Context } from 'koa';
import StatusCodes from 'http-status-codes';
import services from './../services/index';

const types = [
  'WARNING',
  'DANGER',
  'INFO'
];

async function get(ctx: Context): Promise<void> {
  const type: string = ctx.params.type;
  if (!types.includes(type)) {
    ctx.status = StatusCodes.BAD_REQUEST;
    ctx.body = { info: "That type is not valid" };
  } else {
    const messages = await services.getMessageType.getMessages(type);
    ctx.status = StatusCodes.OK;
    if (messages[0]) {
      ctx.body = {
        info: `These are the messages from the type ${type}`, result: messages[1]
      };
    } else {
      ctx.body = {
        info: `There are no messages from the type ${type}`
      };
    }
  }
}

export default {
  get
};
