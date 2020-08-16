import { prop, getModelForClass } from '@typegoose/typegoose';
import * as mongoose from 'mongoose';

class User {
    @prop()
    public name?: string;
}

/*
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = mongoose.ObjectID;

let UserSchema = new Schema({
    Alias: {type: String}
});

let RoverSchema = new Schema({
    RoverName: {type: String}
});

let ParticipantSchema = new Schema({
    User: { type: ObjectID, ref: 'UserSchema'},
    Rover: {type: ObjectID, ref: 'RoverSchema'}
});

let RaceSchema = new Schema({
    PlannedStartDate: {type: Date},
    StartDate: {type: Date},
    PlannedEndDate: {type: Date},
    EndDate: {type: Date},
    Participants: [{type: ObjectID, ref: 'ParticipantSchema'}],
    Scores: [{type: ObjectID, ref:'ScoreSchema'}]
});

let ScoreSchema = new Schema({
    Participant: { type: ObjectID, ref: 'ParticipantSchema' },
    Race: { type: ObjectID, ref: 'RaceSchema' },
    Score: { type: Number}
});

module.exports = 
{ 
    'User': mongoose.model('User', UserSchema),
    'Rover': mongoose.model('Rover', RoverSchema),
    'Participant': mongoose.model('Participant', ParticipantSchema),
    'Race': mongoose.model('Race', RaceSchema),
    'Score': mongoose.model('Score', ScoreSchema)
}

*/