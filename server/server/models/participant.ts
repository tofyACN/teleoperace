import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import RoverSchema from './rover';
import UserSchema from './user';

export default class ParticipantSchema extends TimeStamps {
    @prop({ ref: () => UserSchema, required: true })
    public user: Ref<UserSchema>;

    @prop({ ref: () => RoverSchema, required: true })
    public rover: Ref<RoverSchema>;

    @prop()
    public score: number;
}

export const Participant = getModelForClass(ParticipantSchema);
module.exports = { Participant };
