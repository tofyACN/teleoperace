export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: Date;
};










export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  alias: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type Rover = {
  __typename?: 'Rover';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Participant = {
  __typename?: 'Participant';
  id: Scalars['ID'];
  user: Maybe<User>;
  rover: Maybe<Rover>;
  race: Maybe<Race>;
  score: Maybe<Scalars['Int']>;
};

export type Race = {
  __typename?: 'Race';
  id: Scalars['ID'];
  plannedStartDate: Maybe<Scalars['Date']>;
  startDate: Maybe<Scalars['Date']>;
  plannedEndDate: Maybe<Scalars['Date']>;
  endDate: Maybe<Scalars['Date']>;
  participants: Maybe<Array<Maybe<Participant>>>;
};

export type Query = {
  __typename?: 'Query';
  users: Maybe<Array<Maybe<User>>>;
  rovers: Maybe<Array<Maybe<Rover>>>;
  participants: Maybe<Array<Maybe<Participant>>>;
  races: Maybe<Array<Maybe<Race>>>;
};

export type AdditionalEntityFields = {
  path: Maybe<Scalars['String']>;
  type: Maybe<Scalars['String']>;
};

import { ObjectID } from 'mongodb';

export type UserDbObject = {
  _id: ObjectID,
  alias: string,
  firstName: string,
  lastName: string,
};

export type RoverDbObject = {
  _id: ObjectID,
  name: string,
};

export type ParticipantDbObject = {
  _id: ObjectID,
  user: Maybe<UserDbObject['_id']>,
  rover: Maybe<RoverDbObject['_id']>,
  race: Maybe<RaceDbObject['_id']>,
  score: Maybe<number>,
};

export type RaceDbObject = {
  _id: ObjectID,
  plannedStartDate: Maybe<Date>,
  startDate: Maybe<Date>,
  plannedEndDate: Maybe<Date>,
  endDate: Maybe<Date>,
  participants: Maybe<Array<Maybe<ParticipantDbObject['_id']>>>,
};
