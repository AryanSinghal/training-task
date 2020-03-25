import { Router } from 'express';
import { unsortedObjectsRouter } from './controllers';

const mainRouter: Router = Router();

mainRouter.use('/unsorted-objects', unsortedObjectsRouter);

export default mainRouter;
