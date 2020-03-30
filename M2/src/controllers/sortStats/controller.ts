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

}

export default SortStatsController.getInstance();
