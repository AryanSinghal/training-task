import { Router } from 'express';
import { unsortedObjectsRouter } from './controllers';

const mainRouter: Router = Router();
// mainRouter.use('/sort-stats', sortStats );
mainRouter.use('/unsorted-objects', unsortedObjectsRouter);

export default mainRouter;
