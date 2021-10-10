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

  public list(query = {}, projection = {}, options = { skip: 0, limit: 0 }) {
    const { skip, limit } = options;
    if (limit)
      return this.unsortedObjectsModel.find(query, projection).skip(Number(skip)).limit(Number(limit));
    return this.unsortedObjectsModel.find(query, projection);
  }

  getObject = (query, projection) => {
    return this.unsortedObjectsModel.findOne(query, projection);
  }

  count = (query = {}) => {
    return this.unsortedObjectsModel.countDocuments(query);
  }
}

export default new UnsortedObjectsRepository();
