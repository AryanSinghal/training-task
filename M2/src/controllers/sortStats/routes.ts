import { Router } from 'express';
import controller from './controller';
import { validationHandler } from '../../libs';
import { default as validation } from './validation';

const SortStatsRouter: Router = Router();
SortStatsRouter.route('/')
    .post(validationHandler(validation.create), controller.sortStats);

export default SortStatsRouter;
