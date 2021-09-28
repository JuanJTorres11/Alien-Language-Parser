import { Context } from 'koa';
import StatusCodes from 'http-status-codes';
import services from './../services/index';

async function post(ctx: Context): Promise<void> {
  const message: string = ctx.request.body;
  if (message?.length > 0) {
    const res = await services.postMessageService.verifyMessage(message);
    if (res[0]) {
      ctx.status = StatusCodes.OK;
      ctx.body = { info: "The message have been stored correctly", result: res[1] };
    } else {
      ctx.status = StatusCodes.INTERNAL_SERVER_ERROR;
      ctx.body = { info: "There was a problem while saving the message" };
    }

  } else {
    ctx.status = StatusCodes.BAD_REQUEST;
    ctx.body = { info: "The message is empty or does not have the correct format" };
  }

}

export default {
  post
};
