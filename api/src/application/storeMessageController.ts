import StatusCodes from 'http-status-codes';
import services from './../services/index';

async function post(ctx): Promise<void> {
  const message: string = ctx.request.body;
  if (message?.length > 0) {
    const res = await services.postMessageService.verifyMessage(message);
    ctx.status = StatusCodes.OK;
    ctx.body = { res: "The message have been stored correctly", stored: res };
  } else {
    ctx.status = StatusCodes.BAD_REQUEST;
    ctx.body = { res: "The message is empty or invalid" };
  }
  
}

export default {
  post
};
