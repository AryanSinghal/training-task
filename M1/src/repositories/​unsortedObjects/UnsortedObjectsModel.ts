import * as mongoose from 'mongoose';
import UnsortedObjectsSchema from './UnsortedObjectsSchema';
import IUnsortedObjectsDocument from './IUnsortedObjectsDocument';

const toConvert = {
  transform: (docs: any, ret: any) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
};

export const unsortedObjectsSchema = new UnsortedObjectsSchema({
  collection: 'unsortedObjects',
  toJSON: toConvert,
  toObject: toConvert,
});

export const unsortedObjectsModel: mongoose.Model<IUnsortedObjectsDocument>
  =
  mongoose.model<IUnsortedObjectsDocument>('unsortedObjects', unsortedObjectsSchema, 'unsortedObjects', true);
