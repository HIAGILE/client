/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateToDoListInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: updateToDoList
// ====================================================

export interface updateToDoList_updateToDoList {
  __typename: "UpdateToDoListOutput";
  ok: boolean;
  error: string | null;
}

export interface updateToDoList {
  updateToDoList: updateToDoList_updateToDoList;
}

export interface updateToDoListVariables {
  input: UpdateToDoListInput;
}
