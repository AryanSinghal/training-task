import * as mongoose from 'mongoose';

export default class SortStatsSchema extends mongoose.Schema {
  constructor(options) {
    const versionSchema = {
      _id: String,
      object: Object,
      keyCount: Number,
      depth: Number,
      size: Number,
      generationTime: Number
    };
    super(versionSchema, options);
  }
}
