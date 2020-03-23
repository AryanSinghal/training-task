import { Request, Response } from 'express';
import sizeof from 'sizeof';
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
      const object = getObject(rootKeyCount, maxDepth);
      // const size = sizeof.sizeof(object);
      const keyCount​ = rootKeyCount;
      console.log(object);
      // const objectDetails = await UnsortedObjectsRepository.create({ object, keyCount​, depth, size​, generationTime });
      SystemResponse.success(res, object);
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
