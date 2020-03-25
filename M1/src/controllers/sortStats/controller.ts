import { Request, Response } from 'express';
import { sortStatsRepository } from '../../repositories/sortStats';
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

  insert = async (req, res: Response) => {
    console.log('----------Insert Sort Stats----------');
    try {
      const sortDetails = await sortStatsRepository.create(req.body);
      console.log('object created inside M1', sortDetails);
      if (!sortDetails)
        throw { message: 'Data is not inserted' };
      SystemResponse.success(res, sortDetails);
    }
    catch (err) {
      SystemResponse.failure(res, err, err.message);
    }

  };

  list = async (req: Request, res: Response) => {
    console.log('---------Sort Stats List----------');
    try {
      const { originalId } = req.query;
      console.log(originalId);
      const objectList = await sortStatsRepository.list(originalId);
      SystemResponse.success(res, objectList);
    }
    catch (err) {
      SystemResponse.failure(res, err, err.message);
    }
  };

}

export default SortStatsController.getInstance();
