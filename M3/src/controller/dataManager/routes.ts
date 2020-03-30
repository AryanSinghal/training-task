import { Router } from 'express';
import controller from './controller';
import { validationHandler } from '../../libs';
import { default as validation } from './validation';

const dataManagerRouter: Router = Router();

dataManagerRouter.route('/object')
  .get(validationHandler(validation.list), controller.list)
  .post(validationHandler(validation.createObject), controller.createObject);

dataManagerRouter.route('/sort')
  .get(validationHandler(validation.listSortStats ), controller.listSortStats )
  .post(validationHandler(validation.sortObject), controller.sortObject);

export default dataManagerRouter;
