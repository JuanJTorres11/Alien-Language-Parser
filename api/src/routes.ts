import Router from 'koa-router';
import config from './config';
import controller from './application/index';

const routes = new Router();

routes.get(`/${config.apiPrefix}/health/ping`, controller.health.ping);
routes.post(`/${config.apiPrefix}/message`, controller.postMessage.post);

export default routes;
