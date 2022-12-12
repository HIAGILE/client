/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FollowUserInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: acceptUser
// ====================================================

export interface acceptUser_acceptUser_friends {
  __typename: "Friends";
  id: number;
  verified: boolean;
  friendId: number;
}

export interface acceptUser_acceptUser {
  __typename: "FollowUserOutput";
  ok: boolean;
  error: string | null;
  friends: acceptUser_acceptUser_friends[] | null;
}

export interface acceptUser {
  acceptUser: acceptUser_acceptUser;
}

export interface acceptUserVariables {
  input: FollowUserInput;
}
