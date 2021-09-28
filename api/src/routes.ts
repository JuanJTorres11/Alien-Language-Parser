import Router from 'koa-router';
import config from './config';
import controller from './application/index';

const routes = new Router();

routes.get(`/${config.apiPrefix}/health/ping`, controller.health.ping);
routes.post(`/${config.apiPrefix}/messages`, controller.postMessage.post);
routes.get(`/${config.apiPrefix}/messages/dates/:date1/:date2`, controller.getMessageDates.get);

export default routes;
