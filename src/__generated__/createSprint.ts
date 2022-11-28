/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateSprintInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createSprint
// ====================================================

export interface createSprint_createSprint {
  __typename: "CreateSprintOutput";
  ok: boolean;
  error: string | null;
  sprintId: number | null;
}

export interface createSprint {
  createSprint: createSprint_createSprint;
}

export interface createSprintVariables {
  input: CreateSprintInput;
}
