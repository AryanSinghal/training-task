import * as mongoose from 'mongoose';
import { IUnsortedObjectsDocument, unsortedObjectsSchema, unsortedObjectsModel } from '.';


class UnsortedObjectsRepository {
  protected unsortedObjectsModel;
  constructor() {
    this.unsortedObjectsModel = unsortedObjectsModel;
  }

public create(data) {
  console.log('inside repo');
  return this.unsortedObjectsModel.create(data);
}

public list() {
  console.log('inside repo');
  return this.unsortedObjectsModel.find({});
}
}

export default new UnsortedObjectsRepository();
