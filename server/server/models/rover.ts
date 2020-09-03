import { getModelForClass, prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export default class RoverSchema extends TimeStamps {
    @prop({ required: true })
    public name: string;

    @prop()
    public url: string;
}

export const Rover = getModelForClass(RoverSchema);
module.exports = { Rover };
