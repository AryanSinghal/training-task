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
      const { objectId, sortingAlgorithm, sortDuration } = req.body;
      console.log({ objectId, sortingAlgorithm, sortDuration });
      const sortDetails = await sortStatsRepository.create({ objectId, sortingAlgorithm, sortDuration });
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
      const { objectId } = req.query;
      console.log(objectId);
      const objectList = await sortStatsRepository.list(objectId);
      SystemResponse.success(res, objectList);
    }
    catch (err) {
      SystemResponse.failure(res, err, err.message);
    }
  };

}

export default SortStatsController.getInstance();
