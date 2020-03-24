import { Request, Response } from 'express';
import SystemResponse from '../../libs/SystemResponse';

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

  create = async (req, res: Response) => {
    console.log('----------Create Object----------');
    try {
      SystemResponse.success(res, 'Success');
    }
    catch (err) {
      SystemResponse.failure(res, err, err.message);
    }

  };

  list = async (req: Request, res: Response) => {
    console.log('---------Object List----------');
    try {
      SystemResponse.success(res, 'Success');
    }
    catch (err) {
      SystemResponse.failure(res, err, err.message);
    }
  };

}

export default SortStatsController.getInstance();
