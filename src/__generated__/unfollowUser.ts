/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UnfollowUserInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: unfollowUser
// ====================================================

export interface unfollowUser_unfollowUser_friends {
  __typename: "Friends";
  id: number;
  verified: boolean;
  friendId: number;
}

export interface unfollowUser_unfollowUser {
  __typename: "UnfollowUserOutput";
  ok: boolean;
  error: string | null;
  friends: unfollowUser_unfollowUser_friends[] | null;
}

export interface unfollowUser {
  unfollowUser: unfollowUser_unfollowUser;
}

export interface unfollowUserVariables {
  input: UnfollowUserInput;
}
