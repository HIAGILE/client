/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: allUsers
// ====================================================

export interface allUsers_allUsers_users {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  role: UserRole;
  verified: boolean;
  profileUrl: string;
}

export interface allUsers_allUsers_friends {
  __typename: "Friends";
  id: number;
  verified: boolean;
  friendId: number;
}

export interface allUsers_allUsers_inMyFriends_user {
  __typename: "User";
  id: number;
}

export interface allUsers_allUsers_inMyFriends {
  __typename: "Friends";
  user: allUsers_allUsers_inMyFriends_user;
  id: number;
  verified: boolean;
  friendId: number;
}

export interface allUsers_allUsers {
  __typename: "AllUsersOutput";
  ok: boolean;
  error: string | null;
  users: allUsers_allUsers_users[] | null;
  friends: allUsers_allUsers_friends[] | null;
  inMyFriends: allUsers_allUsers_inMyFriends[] | null;
}

export interface allUsers {
  allUsers: allUsers_allUsers;
}
