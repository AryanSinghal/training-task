import * as mongoose from 'mongoose';

export default class SortStatsSchema extends mongoose.Schema {
  constructor(options) {
    const unsortedObjectsSchema = {
      id: String,
      objectId: String,
      sortDuration: Number,
      sortingAlgorithm: String,
      createdAt: Date,
    };
    super(unsortedObjectsSchema, options);
  }
}
