import { Types } from 'mongoose';
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { User } from '../../models/user';
import { Rover } from '../../models/rover';
import { Participant } from '../../models/participant';
import { Race } from '../../models/race';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: Types.ObjectId;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: Date;
};

export type AuthData = {
  __typename?: 'AuthData';
  userId: Scalars['ID'];
  token: Scalars['String'];
  tokenExpiration: Scalars['Int'];
};


export type Mutation = {
  __typename?: 'Mutation';
  createUser: AuthData;
  updateUser: User;
  createRover: Rover;
  updateRover: Rover;
  deleteRover: Rover;
  createRace: Race;
  updateRace: Race;
  deleteRace: Race;
  addParticipant: Race;
};


export type MutationCreateUserArgs = {
  userInput?: Maybe<UserInput>;
};


export type MutationUpdateUserArgs = {
  userId: Scalars['ID'];
  updateUser?: Maybe<UpdateUser>;
};


export type MutationCreateRoverArgs = {
  roverInput?: Maybe<RoverInput>;
};


export type MutationUpdateRoverArgs = {
  roverId: Scalars['ID'];
  updateRover?: Maybe<RoverInput>;
};


export type MutationDeleteRoverArgs = {
  roverInput: RoverInput;
};


export type MutationCreateRaceArgs = {
  raceInput?: Maybe<RaceInput>;
};


export type MutationUpdateRaceArgs = {
  userId: Scalars['ID'];
  updateRace?: Maybe<RaceInput>;
};


export type MutationDeleteRaceArgs = {
  raceInput: RaceInput;
};


export type MutationAddParticipantArgs = {
  raceId: Scalars['ID'];
  participantInput?: Maybe<ParticipantInput>;
};

export type Participant = {
  __typename?: 'Participant';
  user?: Maybe<User>;
  rover?: Maybe<Rover>;
  score?: Maybe<Scalars['Int']>;
};

export type ParticipantInput = {
  userId: Scalars['ID'];
  roverId: Scalars['ID'];
  score?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  users: Array<User>;
  user: User;
  login: AuthData;
  rovers: Array<Rover>;
  rover: Rover;
  races?: Maybe<Array<Race>>;
};


export type QueryUserArgs = {
  userId: Scalars['ID'];
};


export type QueryLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type QueryRoverArgs = {
  roverInput: RoverInput;
};

export type Race = {
  __typename?: 'Race';
  _id: Scalars['ID'];
  title: Scalars['String'];
  plannedStartDate?: Maybe<Scalars['Date']>;
  startDate?: Maybe<Scalars['Date']>;
  plannedEndDate?: Maybe<Scalars['Date']>;
  endDate?: Maybe<Scalars['Date']>;
  participants: Array<Participant>;
};

export type RaceInput = {
  title: Scalars['String'];
  plannedStartDate?: Maybe<Scalars['Date']>;
  startDate?: Maybe<Scalars['Date']>;
  plannedEndDate?: Maybe<Scalars['Date']>;
  endDate?: Maybe<Scalars['Date']>;
  participants?: Maybe<Array<ParticipantInput>>;
};

export type RaceParticipantInput = {
  raceId: Scalars['ID'];
  participant: ParticipantInput;
};

export type Rover = {
  __typename?: 'Rover';
  _id: Scalars['ID'];
  name: Scalars['String'];
  url: Scalars['String'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
};

export type RoverInput = {
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  userAdded?: Maybe<User>;
  roverAdded?: Maybe<Rover>;
  raceAdded?: Maybe<Race>;
  participantAdded?: Maybe<Participant>;
};

export type UpdateRace = {
  id: Scalars['ID'];
  title: Scalars['String'];
  plannedStartDate?: Maybe<Scalars['Date']>;
  startDate?: Maybe<Scalars['Date']>;
  plannedEndDate?: Maybe<Scalars['Date']>;
  endDate?: Maybe<Scalars['Date']>;
  participants?: Maybe<Array<ParticipantInput>>;
};

export type UpdateRover = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type UpdateUser = {
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
};

export type UserInput = {
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  User: ResolverTypeWrapper<User>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  AuthData: ResolverTypeWrapper<AuthData>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Rover: ResolverTypeWrapper<Rover>;
  RoverInput: RoverInput;
  Race: ResolverTypeWrapper<Race>;
  Participant: ResolverTypeWrapper<Participant>;
  Mutation: ResolverTypeWrapper<{}>;
  UserInput: UserInput;
  UpdateUser: UpdateUser;
  RaceInput: RaceInput;
  ParticipantInput: ParticipantInput;
  Subscription: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  UpdateRover: UpdateRover;
  UpdateRace: UpdateRace;
  RaceParticipantInput: RaceParticipantInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  User: User;
  ID: Scalars['ID'];
  String: Scalars['String'];
  Date: Scalars['Date'];
  AuthData: AuthData;
  Int: Scalars['Int'];
  Rover: Rover;
  RoverInput: RoverInput;
  Race: Race;
  Participant: Participant;
  Mutation: {};
  UserInput: UserInput;
  UpdateUser: UpdateUser;
  RaceInput: RaceInput;
  ParticipantInput: ParticipantInput;
  Subscription: {};
  Boolean: Scalars['Boolean'];
  UpdateRover: UpdateRover;
  UpdateRace: UpdateRace;
  RaceParticipantInput: RaceParticipantInput;
};

export type AuthDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthData'] = ResolversParentTypes['AuthData']> = {
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tokenExpiration?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createUser?: Resolver<ResolversTypes['AuthData'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, never>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'userId'>>;
  createRover?: Resolver<ResolversTypes['Rover'], ParentType, ContextType, RequireFields<MutationCreateRoverArgs, never>>;
  updateRover?: Resolver<ResolversTypes['Rover'], ParentType, ContextType, RequireFields<MutationUpdateRoverArgs, 'roverId'>>;
  deleteRover?: Resolver<ResolversTypes['Rover'], ParentType, ContextType, RequireFields<MutationDeleteRoverArgs, 'roverInput'>>;
  createRace?: Resolver<ResolversTypes['Race'], ParentType, ContextType, RequireFields<MutationCreateRaceArgs, never>>;
  updateRace?: Resolver<ResolversTypes['Race'], ParentType, ContextType, RequireFields<MutationUpdateRaceArgs, 'userId'>>;
  deleteRace?: Resolver<ResolversTypes['Race'], ParentType, ContextType, RequireFields<MutationDeleteRaceArgs, 'raceInput'>>;
  addParticipant?: Resolver<ResolversTypes['Race'], ParentType, ContextType, RequireFields<MutationAddParticipantArgs, 'raceId'>>;
};

export type ParticipantResolvers<ContextType = any, ParentType extends ResolversParentTypes['Participant'] = ResolversParentTypes['Participant']> = {
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  rover?: Resolver<Maybe<ResolversTypes['Rover']>, ParentType, ContextType>;
  score?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, 'userId'>>;
  login?: Resolver<ResolversTypes['AuthData'], ParentType, ContextType, RequireFields<QueryLoginArgs, 'email' | 'password'>>;
  rovers?: Resolver<Array<ResolversTypes['Rover']>, ParentType, ContextType>;
  rover?: Resolver<ResolversTypes['Rover'], ParentType, ContextType, RequireFields<QueryRoverArgs, 'roverInput'>>;
  races?: Resolver<Maybe<Array<ResolversTypes['Race']>>, ParentType, ContextType>;
};

export type RaceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Race'] = ResolversParentTypes['Race']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  plannedStartDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  startDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  plannedEndDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  endDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  participants?: Resolver<Array<ResolversTypes['Participant']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type RoverResolvers<ContextType = any, ParentType extends ResolversParentTypes['Rover'] = ResolversParentTypes['Rover']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  userAdded?: SubscriptionResolver<Maybe<ResolversTypes['User']>, "userAdded", ParentType, ContextType>;
  roverAdded?: SubscriptionResolver<Maybe<ResolversTypes['Rover']>, "roverAdded", ParentType, ContextType>;
  raceAdded?: SubscriptionResolver<Maybe<ResolversTypes['Race']>, "raceAdded", ParentType, ContextType>;
  participantAdded?: SubscriptionResolver<Maybe<ResolversTypes['Participant']>, "participantAdded", ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type Resolvers<ContextType = any> = {
  AuthData?: AuthDataResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Participant?: ParticipantResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Race?: RaceResolvers<ContextType>;
  Rover?: RoverResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
