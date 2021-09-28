import { Context } from 'koa';
import StatusCodes from 'http-status-codes';
import services from './../services/index';

async function get(ctx: Context): Promise<void> {
  const valid: string = ctx.params.valid;
  if (valid != 'true' && valid != 'false') {
    ctx.status = StatusCodes.BAD_REQUEST;
    ctx.body = { info: "Only a bool is a valid parameter" };
  } else {
    const messages = await services.getMessageValid.getMessages(valid == "true" ? true : false);
    ctx.status = StatusCodes.OK;
    if (messages[0]) {
      ctx.body = {
        info: `These are the messages that are ${valid ? "valid" : "invalid"}`, result: messages[1]
      };
    } else {
      ctx.body = {
        info: `There are no messages that are ${valid ? "valid" : "invalid"}`
      };
    }
  }
}

export default {
  get
};
