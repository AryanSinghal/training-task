import * as express from 'express';
import * as bodyParser from 'body-parser';
import { notFoundRoute, errorHandler } from './libs/routes';
import mainRouter from './router';

export class Server {
  private app: express.Express;
  constructor(protected config) {
    this.app = express();
  }

  public bootstrap = (): Server => {
    this.initBodyParser();
    this.setupRoutes();
    return this;
  }

  public run = async (): Promise<Server> => {
    try {
      const { app, config: { port} }: Server = this;
      app.listen(port, (err) => {
        if (err) {
          console.log(err);
        }
        console.log(`Express app Successfully started on port : ${port} `);
      });
    }
    catch (err) {
      throw err;
    }
    return this;
  }

  public initBodyParser = () => {
    const { app } = this;
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
  }

  public setupRoutes = (): void => {
    const { app }: Server = this;
    app.get('/health-check', (req: express.Request, res: express.Response) => res.send('I am OK'));
    app.use('/api', mainRouter);
    app.use(notFoundRoute);
    app.use(errorHandler);
  }
}
