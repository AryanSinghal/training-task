import { Router } from 'express';
import controller from './controller';
import { validationHandler } from '../../libs';
import { default as validation } from './validation';

const unsortedObjectsRouter: Router = Router();
unsortedObjectsRouter.route('/')
    .get(validationHandler(validation.get), controller.list)
    .post(validationHandler(validation.create), controller.create);

export default unsortedObjectsRouter;
