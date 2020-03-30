import { Request, Response, response } from 'express';
import axios from 'axios';
import * as querystring from 'querystring';
import SystemResponse from '../../libs/SystemResponse';
import { M1_UNSORTED_OBJECTS_API, M2_API, M1_SORT_STATS_API, M1_SORT_STATS_LIST_API } from '../../libs/constant';

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
      const sortDuration = await axios.get(M1_SORT_STATS_API);
      console.log(sortDuration.data.data);
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
      const { sortingAlgorithm, objectId } = req.body;
      const objectData = await axios.get(M1_UNSORTED_OBJECTS_API + '/' + objectId); // for object
      const { object } = objectData.data.data;
      console.log(object);
      const responseData = await axios.post(M2_API, { object, sortingAlgorithm }); // for sortDuration
      console.log({ objectId, ...responseData.data.data });
      const { data } = await axios.post(M1_SORT_STATS_API, { objectId, ...responseData.data.data }); // insert data
      console.log(data);
      SystemResponse.success(res, data.data);
    }
    catch (err) {
      SystemResponse.failure(res, err, err.message);
    }
  };

  listSortStats = async (req: Request, res: Response) => {
    try {
      const { skip, limit, objectId } = req.query;
      const { data: { data } } = await axios.get(M1_SORT_STATS_LIST_API + '?' + querystring.stringify({ skip, limit, objectId }));
      console.log(data);
      SystemResponse.success(res, data);
    } catch (err) {
      console.log(err);
    }
  }
}

export default DataMangerController.getInstance();
