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
      const objectList = await UnsortedObjectsRepository.list();
      SystemResponse.success(res, objectList);
    }
    catch (err) {
      SystemResponse.failure(res, err, err.message);
    }
  };

}

export default UnsortedObjectsController.getInstance();
