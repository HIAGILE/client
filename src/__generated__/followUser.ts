/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FollowUserInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: followUser
// ====================================================

export interface followUser_followUser_friends {
  __typename: "Friends";
  id: number;
  verified: boolean;
  friendId: number;
}

export interface followUser_followUser {
  __typename: "FollowUserOutput";
  ok: boolean;
  error: string | null;
  friends: followUser_followUser_friends[] | null;
}

export interface followUser {
  followUser: followUser_followUser;
}

export interface followUserVariables {
  input: FollowUserInput;
}
