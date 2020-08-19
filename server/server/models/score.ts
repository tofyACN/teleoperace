import { prop, Ref } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import ParticipantSchema from './participant';
import { RaceSchema } from './race';

export class ScoreSchema extends TimeStamps {
    @prop({ ref: () => ParticipantSchema, required: true })
    public participant!: Ref<ParticipantSchema>;

    @prop({ ref: () => RaceSchema, required: true })
    public race!: Ref<RaceSchema>;

    @prop({ required: true })
    public score!: number;
}
