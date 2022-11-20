/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddMembersInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: addMembers
// ====================================================

export interface addMembers_addMembers {
  __typename: "AddMembersOutput";
  ok: boolean;
  error: string | null;
}

export interface addMembers {
  addMembers: addMembers_addMembers;
}

export interface addMembersVariables {
  input: AddMembersInput;
}
