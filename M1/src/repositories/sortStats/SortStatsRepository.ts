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

  public list(originalId) {
    return this.sortStatsModel.find({originalId});
  }
}

export default new SortStatsRepository();
