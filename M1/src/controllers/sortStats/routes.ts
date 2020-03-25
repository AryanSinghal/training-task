import { Router } from 'express';
import controller from './controller';
import { validationHandler } from '../../libs';
import { default as validation } from './validation';

const sortStatsRouter: Router = Router();
sortStatsRouter.route('/')
    .get(validationHandler(validation.get), controller.list)
    .post(validationHandler(validation.insert), controller.insert);

export default sortStatsRouter;
