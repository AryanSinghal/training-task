import { Router } from 'express';
import { dataManagerRouter } from './controller';

const mainRouter: Router = Router();

mainRouter.use('/', dataManagerRouter);

export default mainRouter;
