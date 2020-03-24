import { Router } from 'express';
import { SortStatsRouter } from './controllers';

const mainRouter: Router = Router();

mainRouter.use('/sort-stats', SortStatsRouter);

export default mainRouter;
