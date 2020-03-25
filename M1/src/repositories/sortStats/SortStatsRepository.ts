import * as mongoose from 'mongoose';
import { default as ISortStatsDocument } from './ISortStatsDocument';
import { sortStatsModel } from './SortStatsModel';

class SortStatsRepository {
  protected sortStatsModel: mongoose.Model<ISortStatsDocument>;
  constructor() {
    this.sortStatsModel = sortStatsModel;
  }

  public create(data) {
    return this.sortStatsModel.create(data);
  }

  public list(objectId) {
    return this.sortStatsModel.find({objectId});
  }
}

export default new SortStatsRepository();
