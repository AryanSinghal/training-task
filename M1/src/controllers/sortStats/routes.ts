import { Router } from 'express';
import controller from './controller';
import { validationHandler } from '../../libs';
import { default as validation } from './validation';

const sortStatsRouter: Router = Router();
sortStatsRouter.route('/')
  .get(validationHandler(validation.getAll), controller.list)
  .post(validationHandler(validation.insert), controller.insert);

sortStatsRouter.route('/list')
  .get(validationHandler(validation.getStats), controller.listStats)
  .post(validationHandler(validation.insertAll), controller.insertAll);

export default sortStatsRouter;
