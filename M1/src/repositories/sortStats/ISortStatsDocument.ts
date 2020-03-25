import * as mongoose from 'mongoose';

export default interface ISortStatsDocument extends mongoose.Document {
  id: string;
  objectId: string;
  sortDuration: number;
  sortingAlgorithm: string;
}
