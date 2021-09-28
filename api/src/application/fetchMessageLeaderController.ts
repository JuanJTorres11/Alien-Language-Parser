import { Context } from 'koa';
import StatusCodes from 'http-status-codes';
import services from './../services/index';

async function get(ctx: Context): Promise<void> {

  const leaderName: string = ctx.params.name;
  if (leaderName.length != 1) {
    ctx.status = StatusCodes.BAD_REQUEST;
    ctx.body = { info: "The name of the leader can only be one letter" };
  } else {
    const messages = await services.getMessageLeader.getMessages(leaderName);
    ctx.status = StatusCodes.OK;
    if (messages[0]) {
      ctx.body = {
        info: `These are the messages from the alien leader ${leaderName}`, result: messages[1]
      };
    } else {
      ctx.body = {
        info: `There are no messages from the alien leader ${leaderName}`
      };
    }
  }
}

export default {
  get
};
