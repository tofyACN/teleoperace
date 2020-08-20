import { prop, Ref } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import ParticipantSchema from './participant';
import ScoreSchema from './score';

export default class RaceSchema extends TimeStamps {
    @prop({required: true})
    public title: string;

    @prop()
    public plannedStartDate: Date;

    @prop()
    public startDate: Date;

    @prop()
    public plannedEndDate: Date;

    @prop()
    public endDate: Date;

    @prop({ ref: () => ParticipantSchema })
    public participants?: Array<Ref<ParticipantSchema>>;

    @prop({ ref: () => ScoreSchema })
    public scores?: Array<Ref<ScoreSchema>>;
}
