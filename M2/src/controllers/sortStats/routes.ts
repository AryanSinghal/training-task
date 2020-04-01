import { Router } from 'express';
import controller from './controller';
import { validationHandler } from '../../libs';
import { default as validation } from './validation';

const SortStatsRouter: Router = Router();
SortStatsRouter.route('/sort')
  .post(validationHandler(validation.create), controller.sortStats);

SortStatsRouter.route('/sort-all')
  .get((req, res) => res.send('I am OK'))
  .post(validationHandler(validation.create), controller.sortAll);

export default SortStatsRouter;
