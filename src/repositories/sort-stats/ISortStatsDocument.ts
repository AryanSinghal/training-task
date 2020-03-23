import * as mongoose from 'mongoose';

export default interface ISortStatsDocument extends mongoose.Document {
  _id: string;
  object: object;
  keyCount: number;
  depth: number;
  size: number;
  generationTime: number;
}
