import * as mongoose from 'mongoose';
import { default as ISortStatsDocument } from './ISortStatsDocument';
import { sortStatsModel } from './SortStatsModel';

class UnsortedObjectsRepository {
  protected sortStatsModel: mongoose.Model<ISortStatsDocument>;
  constructor() {
    this.sortStatsModel = sortStatsModel;
  }

  public create(data) {
    console.log('inside repo');
    return this.sortStatsModel.create(data);
  }

  public list() {
    console.log('inside repo');
    return this.sortStatsModel.find({});
  }
}

export default new UnsortedObjectsRepository();
