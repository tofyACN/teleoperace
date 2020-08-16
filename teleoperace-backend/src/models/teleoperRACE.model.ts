import { Document, DocumentDefinition, Model, Schema} from 'mongoose';
import { prop, Typegoose, ModelType, InstanceType } from 'typegoose';
import {UserDbObject} from '../generated/graphql';

declare interface IUser extends DocumentDefinition<UserDbObject>, Document {
    _id: Document['_id']
}

export interface UserModel extends Model<IUser> {};

export class User {
    private _model: Model<IUser>;

    constructor() {
        const schema = new Schema<IUser>();
    }
}


