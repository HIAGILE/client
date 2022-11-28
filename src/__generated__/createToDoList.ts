/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateToDoListInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createToDoList
// ====================================================

export interface createToDoList_createToDoList {
  __typename: "CreateToDoListOutput";
  ok: boolean;
  error: string | null;
  toDoListId: number | null;
}

export interface createToDoList {
  createToDoList: createToDoList_createToDoList;
}

export interface createToDoListVariables {
  input: CreateToDoListInput;
}
