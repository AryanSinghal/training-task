import * as mongoose from 'mongoose';

export default interface IUnsortedObjectsDocument extends mongoose.Document {
  id: string;
  object: object;
  keyCount: number;
  depth: number;
  size: number;
  generationTime: number;
}
