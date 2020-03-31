import { Router } from 'express';
import controller from './controller';
import { validationHandler } from '../../libs';
import { default as validation } from './validation';

const unsortedObjectsRouter: Router = Router();
unsortedObjectsRouter.route('/list')
  .get(validationHandler(validation.getAllObject), controller.getAllObject);
unsortedObjectsRouter.route('/')
  .get(validationHandler(validation.get), controller.list)
  .post(validationHandler(validation.create), controller.create);
unsortedObjectsRouter.route('/:id')
  .get(validationHandler(validation.getObject), controller.getObject);



export default unsortedObjectsRouter;
