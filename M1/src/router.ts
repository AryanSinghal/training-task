import { Router } from 'express';
import { unsortedObjectsRouter, sortStatsRouter } from './controllers';

const mainRouter: Router = Router();

mainRouter.use('/unsorted-objects', unsortedObjectsRouter);
mainRouter.use('/sort-stats', sortStatsRouter);

export default mainRouter;
