import * as mongoose from 'mongoose';
import { default as ISortStatsDocument } from './ISortStatsDocument';
import { sortStatsModel } from './SortStatsModel';

class SortStatsRepository {
  protected sortStatsModel: mongoose.Model<ISortStatsDocument>;
  constructor() {
    this.sortStatsModel = sortStatsModel;
  }

  public create(data) {
    return this.sortStatsModel.create({ ...data, createdAt: Date.now() });
  }

  public list(query = {}, projection = {}, options) {
    const { skip, limit } = options;
    return this.sortStatsModel.find(query, projection).skip(Number(skip)).limit(Number(limit));
  }

  public count(query = {}) {
    return this.sortStatsModel.countDocuments(query);
  }
}

export default new SortStatsRepository();
