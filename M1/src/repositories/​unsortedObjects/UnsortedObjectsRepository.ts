import * as mongoose from 'mongoose';
import { default as IUnsortedObjectsDocument } from './IUnsortedObjectsDocument';
import { unsortedObjectsModel } from './UnsortedObjectsModel';

class UnsortedObjectsRepository {
  protected unsortedObjectsModel: mongoose.Model<IUnsortedObjectsDocument>;
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
