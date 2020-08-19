import { prop } from '@typegoose/typegoose';

export default class RoverSchema {
    @prop({ required: true })
    public name: string;

    @prop()
    public url: URL;
}
