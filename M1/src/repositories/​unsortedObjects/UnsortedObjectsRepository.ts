import * as mongoose from 'mongoose';
import { default as IUnsortedObjectsDocument } from './IUnsortedObjectsDocument';
import { unsortedObjectsModel } from './UnsortedObjectsModel';

class UnsortedObjectsRepository {
  protected unsortedObjectsModel: mongoose.Model<IUnsortedObjectsDocument>;
  constructor() {
    this.unsortedObjectsModel = unsortedObjectsModel;
  }

  public create(data) {
    return this.unsortedObjectsModel.create(data);
  }

  public list(query, projection, options) {
    const { skip, limit } = options;
    return this.unsortedObjectsModel.find(query, projection).skip(Number(skip)).limit(Number(limit));
  }
}

export default new UnsortedObjectsRepository();
