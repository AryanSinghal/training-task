import { Router } from 'express';
import { SortStatsRouter } from './controllers';

const mainRouter: Router = Router();

mainRouter.use('/', SortStatsRouter);

export default mainRouter;
