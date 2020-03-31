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
      const { skip, limit } = req.query;
      const query = {};
      const projection = { id: 0 };
      const options = { skip, limit };
      const objectList = await sortStatsRepository.list(query, projection, options);
      if (!objectList)
        throw { message: 'Object List is ' + objectList };
      SystemResponse.success(res, objectList);
    }
    catch (err) {
      SystemResponse.failure(res, err, err.message);
    }
  };

  listStats = async (req: Request, res: Response) => {
    console.log('---------Sort Stats List For Particular Id----------');
    try {
      const { objectId, skip, limit } = req.query;
      console.log(objectId);
      const query = { objectId };
      const projection = {};
      const options = { skip, limit };
      const objectList = await sortStatsRepository.list(query, projection, options);
      const count = await sortStatsRepository.count(query);
      console.log(objectList, count);
      const sortStats = { list: objectList, count };
      SystemResponse.success(res, sortStats);
    }
    catch (err) {
      SystemResponse.failure(res, err, err.message);
    }
  };

  insertAll = async (req, res: Response) => {
    console.log('----------Insert Sort Stats----------');
    try {
      const { data } = req.body;
      console.log(data);
      data.forEach(async (item) => {
        const sortDetails = await sortStatsRepository.create(item);
        console.log('object created inside M1', sortDetails);
      });
      SystemResponse.success(res, 'Data successfully inserted');
    }
    catch (err) {
      SystemResponse.failure(res, err, err.message);
    }
  };

}

export default SortStatsController.getInstance();
