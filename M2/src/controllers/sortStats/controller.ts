import { Request, Response } from 'express';
import SystemResponse from '../../libs/SystemResponse';
import sortObject from './helper';

class SortStatsController {
  static instance: SortStatsController;

  static getInstance = () => {
    if (SortStatsController.instance) {
      return SortStatsController.instance;
    }
    else {
      SortStatsController.instance = new SortStatsController();
      return SortStatsController.instance;
    }
  }

  sortStats = (req: Request, res: Response) => {
    console.log('---------Sort Stats----------');
    try {
      const { object, sortingAlgorithm } = req.body;
      const startTime = new Date().getTime();
      sortObject(object, sortingAlgorithm, startTime);
      const endTime = new Date().getTime();
      const sortDuration = endTime - startTime;
      const responseObject = { sortingAlgorithm, sortDuration };
      console.log(responseObject);
      SystemResponse.success(res, responseObject);
    }
    catch (err) {
      SystemResponse.failure(res, err, err.message);
    }
  };

  sortAll = (req: Request, res: Response) => {
    console.log('---------Sort All Stats----------');
    let responseObject = [];
    try {
      const { object, sortingAlgorithm } = req.body;
      Object.keys(object).map((index) => {
        console.log(object[index].id);
        const startTime = new Date().getTime();
        sortObject(object[index].object, sortingAlgorithm, startTime);
        const endTime = new Date().getTime();
        const sortDuration = endTime - startTime;
        responseObject = [{ objectId: object[index].id, sortingAlgorithm, sortDuration, createdAt: Date.now() }, ...responseObject];
      });
      console.log(responseObject);
      SystemResponse.success(res, responseObject);
    }
    catch (err) {
      SystemResponse.failure(res, err, err.message);
    }
  };
}

export default SortStatsController.getInstance();
