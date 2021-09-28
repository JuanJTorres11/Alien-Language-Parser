import { Context } from 'koa';
import StatusCodes from 'http-status-codes';
import services from './../services/index';

async function get(ctx: Context): Promise<void> {

  const date1 = new Date(ctx.params.date1);
  const date2 = new Date(ctx.params.date2);
  if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
    ctx.status = StatusCodes.BAD_REQUEST;
    ctx.body = { info: "The dates are not correctly formated" };
  } else if( date1 >= date2) {
    ctx.status = StatusCodes.BAD_REQUEST;
    ctx.body = { info: "The range of dates is not correct" };
  } else {
    const messages = await services.getMessageDates.getMessages(date1, date2);
    ctx.status = StatusCodes.OK;
    if (messages[0]) {
      ctx.body = {
        info: `These are the messages between ${date1} and ${date2}`, result: messages[1]
      };
    } else {
      ctx.body = {
        info: `There are no messages between ${date1} and ${date2}`
      };
    }
  }
}

export default {
  get
};
