import { Router } from 'express';
import controller from './controller';
import { validationHandler } from '../../libs';
// import { default as validation } from './validation';

const dataManagerRouter: Router = Router();

dataManagerRouter.route('/object')
  .get(controller.list)
  .post(controller.createObject);

dataManagerRouter.route('/sort')
  .post(controller.sortObject);

export default dataManagerRouter;
