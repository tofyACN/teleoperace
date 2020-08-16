import gql from 'graphql-tag';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};


export type User = {
  __typename: 'User';
  id: Scalars['ID'];
  alias: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type Rover = {
  __typename: 'Rover';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Participant = {
  __typename: 'Participant';
  id: Scalars['ID'];
  user?: Maybe<User>;
  rover?: Maybe<Rover>;
  race?: Maybe<Race>;
  score?: Maybe<Scalars['Int']>;
};

export type Race = {
  __typename: 'Race';
  id: Scalars['ID'];
  plannedStartDate?: Maybe<Scalars['Date']>;
  startDate?: Maybe<Scalars['Date']>;
  plannedEndDate?: Maybe<Scalars['Date']>;
  endDate?: Maybe<Scalars['Date']>;
  participants?: Maybe<Array<Maybe<Participant>>>;
};

export type Query = {
  __typename: 'Query';
  users?: Maybe<Array<Maybe<User>>>;
  rovers?: Maybe<Array<Maybe<Rover>>>;
  participants?: Maybe<Array<Maybe<Participant>>>;
  races?: Maybe<Array<Maybe<Race>>>;
};

export type PastRacesQueryVariables = Exact<{ [key: string]: never; }>;


export type PastRacesQuery = (
  { __typename: 'Query' }
  & { races?: Maybe<Array<Maybe<(
    { __typename: 'Race' }
    & Pick<Race, 'startDate'>
    & { participants?: Maybe<Array<Maybe<(
      { __typename: 'Participant' }
      & Pick<Participant, 'score'>
      & { user?: Maybe<(
        { __typename: 'User' }
        & Pick<User, 'alias'>
      )> }
    )>>> }
  )>>> }
);


export const PastRacesDocument = gql`
    query pastRaces {
  races {
    startDate
    participants {
      user {
        alias
      }
      score
    }
  }
}
    `;
export type PastRacesComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<PastRacesQuery, PastRacesQueryVariables>, 'query'>;

    export const PastRacesComponent = (props: PastRacesComponentProps) => (
      <ApolloReactComponents.Query<PastRacesQuery, PastRacesQueryVariables> query={PastRacesDocument} {...props} />
    );
    
export type PastRacesProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<PastRacesQuery, PastRacesQueryVariables>
    } & TChildProps;
export function withPastRaces<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  PastRacesQuery,
  PastRacesQueryVariables,
  PastRacesProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, PastRacesQuery, PastRacesQueryVariables, PastRacesProps<TChildProps, TDataName>>(PastRacesDocument, {
      alias: 'pastRaces',
      ...operationOptions
    });
};
export type PastRacesQueryResult = ApolloReactCommon.QueryResult<PastRacesQuery, PastRacesQueryVariables>;