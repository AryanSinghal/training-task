import { Request, Response } from 'express';
const sizeof = require('object-sizeof');
import { UnsortedObjectsRepository } from '../../repositories/​unsortedObjects';
import SystemResponse from '../../libs/SystemResponse';
import getObject from './helper';

class UnsortedObjectsController {
  static instance: UnsortedObjectsController;

  static getInstance = () => {
    if (UnsortedObjectsController.instance) {
      return UnsortedObjectsController.instance;
    }
    else {
      UnsortedObjectsController.instance = new UnsortedObjectsController();
      return UnsortedObjectsController.instance;
    }
  }

  create = async (req, res: Response) => {
    console.log('----------Create Object----------');
    try {
      const { rootKeyCount, maxDepth } = req.body;
      const start = new Date().getTime();
      const object = getObject(rootKeyCount, maxDepth);
      const end = new Date().getTime();
      const generationTime = end - start;
      const size = sizeof(object);
      const keyCount = rootKeyCount;
      const depth = maxDepth;
      const objectDetails = await UnsortedObjectsRepository.create({ object, keyCount, depth, size, generationTime });
      console.log('object created inside M1', objectDetails);
      if (!objectDetails)
        throw { message: 'Data is not inserted' };
      SystemResponse.success(res, objectDetails);
    }
    catch (err) {
      SystemResponse.failure(res, err, err.message);
    }

  };

  list = async (req: Request, res: Response) => {
    console.log('---------Object List----------');
    try {
      const { skip, limit } = req.query;
      const query = {};
      const projection = { object: 0 };
      const options = { skip, limit };
      const objectList = await UnsortedObjectsRepository.list(query, projection, options);
      const Count = await UnsortedObjectsRepository.count();
      console.log({ ...objectList, Count });
      SystemResponse.success(res, { objectData: objectList, Count });
    }
    catch (err) {
      SystemResponse.failure(res, err, err.message);
    }
  };

  getObject = async (req: Request, res: Response) => {
    console.log('---------GET OBJECT----------');
    try {
      const { id } = req.params;
      console.log(id);
      const query = { _id: id };
      const projection = { object: 1 };
      const object = await UnsortedObjectsRepository.getObject(query, projection);
      console.log(object);
      SystemResponse.success(res, object);
    }
    catch (err) {
      SystemResponse.failure(res, err, err.message);
    }
  };

  getAllObject = async (req: Request, res: Response) => {
    console.log('---------GET ALL OBJECT----------');
    try {
      const query = {};
      const projection = {};
      const limit = await UnsortedObjectsRepository.count();
      const object = await UnsortedObjectsRepository.list(query, projection, { skip: 0, limit });
      console.log(object);
      SystemResponse.success(res, object);
    }
    catch (err) {
      SystemResponse.failure(res, err, err.message);
    }
  };

}

export default UnsortedObjectsController.getInstance();
