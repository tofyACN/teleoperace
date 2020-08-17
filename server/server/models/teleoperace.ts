import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { prop, Ref } from '@typegoose/typegoose';
import { User } from './user' 

export class Rover {
    @prop({ required: true })
    public name: string;

    @prop()
    public url: URL;
}

export class Participant extends TimeStamps {
    @prop({ ref: () => User, required: true })
    public user: Ref<User>;

    @prop({ ref: () => Rover, required: true })
    public rover: Ref<Rover>;
}

export class Race extends TimeStamps {
    @prop()
    public plannedStartDate: Date;

    @prop()
    public startDate: Date;

    @prop()
    public plannedEndDate: Date;

    @prop()
    public endDate: Date;

    @prop({ref : () => Participant})
    participants: Ref<Participant>[];

    @prop({ref : () => Score})
    scores: Ref<Score>[];
}

export class Score extends TimeStamps {
    @prop({ ref: () => Participant, required: true })
    participant!: Ref<Participant>;

    @prop({ ref: () => Race, required: true })
    race!: Ref<Race>;

    @prop({ required: true })
    score!: Number;
}
