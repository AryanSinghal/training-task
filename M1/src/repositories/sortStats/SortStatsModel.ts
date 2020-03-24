import * as mongoose from 'mongoose';
import SortStatsSchema from './SortStatsSchema';
import ISortStatsDocument from './ISortStatsDocument';

const toConvert = {
    transfers: (docs: any, ret: any) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret._v;
    }
};

export const sortStatsSchema = new SortStatsSchema({
    collection: 'unsortedObjects',
    toJSON: toConvert,
    toObject: toConvert,
});

export const sortStatsModel: mongoose.Model<ISortStatsDocument> = mongoose.model<ISortStatsDocument>('unsortedObjects', sortStatsSchema, 'unsortedObjects', true);
