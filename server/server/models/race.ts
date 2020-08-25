import { prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import ParticipantSchema from './participant';

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

    @prop({required: true})
    public participants: [ParticipantSchema];
}
