import { Request, Response } from 'express';
import axios from 'axios';
import SystemResponse from '../../libs/SystemResponse';
import { M1_UNSORTED_OBJECTS_API, M2_API } from '../../libs/constant';

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
      console.log('req>>>>>', req.body);
      const response = await axios.post(M1_UNSORTED_OBJECTS_API, req.body);
      console.log('Res inside M3', response.data);
      SystemResponse.success(res, response.data);
    }
    catch (err) {
      SystemResponse.failure(res, err, err.message);
    }
  };

  list = async (req: Request, res: Response) => {
    console.log('---------List Objects----------');
    try {
      const response = await axios.get(M1_UNSORTED_OBJECTS_API);
      SystemResponse.success(res, response.data);
    }
    catch (err) {
      SystemResponse.failure(res, err, err.message);
    }
  };

  sortObject = async (req: Request, res: Response) => {
    console.log('---------Sort Object----------');
    try {
      const { object, sortingAlgorithm, objectId } = req.body;
      const response = await axios.post(M2_API, { object, sortingAlgorithm });

      SystemResponse.success(res, 'Success');
    }
    catch (err) {
      SystemResponse.failure(res, err, err.message);
    }
  };

}

export default DataMangerController.getInstance();
