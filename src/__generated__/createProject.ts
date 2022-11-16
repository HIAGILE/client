/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateProjectInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createProject
// ====================================================

export interface createProject_createProject {
  __typename: "CreateProjectOutput";
  ok: boolean;
  error: string | null;
  projectId: number | null;
}

export interface createProject {
  createProject: createProject_createProject;
}

export interface createProjectVariables {
  input: CreateProjectInput;
}
