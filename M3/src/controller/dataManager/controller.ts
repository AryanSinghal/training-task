import { Request, Response, response } from 'express';
import axios from 'axios';
import * as querystring from 'querystring';
import SystemResponse from '../../libs/SystemResponse';
import { M1_UNSORTED_OBJECTS_API, M2_API, M1_SORT_STATS_API } from '../../libs/constant';

class DataMangerController {
  static instance: DataMangerController;

  static getInstance = () => {
    if (DataMangerController.instance) {
      return DataMangerController.instance;
    }
    else {
      DataMangerController.instance = new DataMangerController();
      return DataMangerController.instance;
    }
  }

  createObject = async (req: Request, res: Response) => {
    console.log('---------Create Object----------');
    try {
      const { rootKeyCount, maxDepth } = req.body;
      const { data } = await axios.post(M1_UNSORTED_OBJECTS_API, { rootKeyCount, maxDepth });
      SystemResponse.success(res, data.data);
    }
    catch (err) {
      SystemResponse.failure(res, err, err.message);
    }
  };

  list = async (req: Request, res: Response) => {
    console.log('---------List Objects----------');
    try {
      const { skip, limit } = req.query;
      console.log({ skip, limit });
      const { data } = await axios.get(M1_UNSORTED_OBJECTS_API + '?' + querystring.stringify({ skip, limit }));
      console.log(data);
      SystemResponse.success(res, data.data);
      res.end();
    }
    catch (err) {
      SystemResponse.failure(res, err, err.message);
    }
  };

  sortObject = async (req: Request, res: Response) => {
    console.log('---------Sort Object----------');
    try {
      const { object, sortingAlgorithm, objectId } = req.body;
      const responseData = await axios.post(M2_API, { object, sortingAlgorithm });
      console.log({ objectId, ...responseData.data.data });
      const { data } = await axios.post(M1_SORT_STATS_API, { objectId, ...responseData.data.data });
      console.log(data);
      SystemResponse.success(res, data.data);
    }
    catch (err) {
      SystemResponse.failure(res, err, err.message);
    }
  };
}

export default DataMangerController.getInstance();
