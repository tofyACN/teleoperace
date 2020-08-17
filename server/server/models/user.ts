import { prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export class User extends TimeStamps{
  @prop()
  public name: string;

  @prop()
  public email: string;

  @prop()
  public password: string;
}