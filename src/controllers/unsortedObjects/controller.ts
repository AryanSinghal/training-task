import { Request, Response } from 'express';
import { UnsortedObjectsRepository } from '../../repositories/​unsortedObjects';
import SystemResponse from '../../libs/SystemResponse';

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
      const objectDetails = await UnsortedObjectsRepository.create({ object: { name: 'try' } });
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
