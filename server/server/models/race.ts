import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import ParticipantSchema from './participant';
import { ScoreSchema } from './score';

export class RaceSchema extends TimeStamps {
    @prop()
    public plannedStartDate: Date;

    @prop()
    public startDate: Date;

    @prop()
    public plannedEndDate: Date;

    @prop()
    public endDate: Date;

    @prop({ ref: () => ParticipantSchema })
    public participants: Array<Ref<ParticipantSchema>>;

    @prop({ ref: () => ScoreSchema })
    public scores: Array<Ref<ScoreSchema>>;
}

const Race = getModelForClass(RaceSchema);

export default Race;

module.exports = { RaceSchema };
