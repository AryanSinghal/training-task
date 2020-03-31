import { Router } from 'express';
import controller from './controller';
import { validationHandler } from '../../libs';
import { default as validation } from './validation';

const SortStatsRouter: Router = Router();
SortStatsRouter.route('/')
  .post(validationHandler(validation.create), controller.sortStats);

SortStatsRouter.route('/sort-all')
  .post(validationHandler(validation.create), controller.sortAll);

export default SortStatsRouter;
