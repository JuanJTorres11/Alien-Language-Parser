import StatusCodes from 'http-status-codes';

async function post(ctx): Promise<void> {
  let b = ctx.request.body
  ctx.status = StatusCodes.OK;
  ctx.body = { res: b };
}

export default {
  post
};
