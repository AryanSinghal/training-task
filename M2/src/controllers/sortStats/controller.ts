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

  sortStats = async (req: Request, res: Response) => {
    console.log('---------Sort Stats----------');
    try {
      const { object, sortingAlgorithm, id = 1  } = req.body;
      const startTime = new Date().getTime();
      sortObject(object, sortingAlgorithm, startTime);
      const endTime = new Date().getTime();
      const sortDuration = endTime - startTime;
      const responseObject = { objectId: id, sortingAlgorithm, sortDuration }
      SystemResponse.success(res, responseObject);
    }
    catch (err) {
      SystemResponse.failure(res, err, err.message);
    }
  };

}

export default SortStatsController.getInstance();
