/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetFriendsInput, UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: getFriends
// ====================================================

export interface getFriends_getFriends_friends {
  __typename: "User";
  id: number;
  email: string;
  name: string;
  role: UserRole;
  verified: boolean;
  profileUrl: string;
}

export interface getFriends_getFriends {
  __typename: "GetFriendsOutput";
  ok: boolean;
  error: string | null;
  friends: getFriends_getFriends_friends[] | null;
}

export interface getFriends {
  getFriends: getFriends_getFriends;
}

export interface getFriendsVariables {
  input: GetFriendsInput;
}
