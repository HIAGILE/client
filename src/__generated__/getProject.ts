/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetProjectInput, ProjectCode, UserRole, ToDoListStatus, ProjectRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: getProject
// ====================================================

export interface getProject_getProject_project_owner {
  __typename: "User";
  name: string;
  role: UserRole;
  email: string;
}

export interface getProject_getProject_project_sprints_toDoList {
  __typename: "ToDoList";
  id: number;
  createAt: any;
  updateAt: any;
  startDate: any;
  endDate: any;
  title: string;
  description: string;
  status: ToDoListStatus;
}

export interface getProject_getProject_project_sprints {
  __typename: "Sprint";
  id: number;
  createAt: any;
  updateAt: any;
  startDate: any;
  endDate: any;
  period: number;
  purpose: string;
  toDoList: getProject_getProject_project_sprints_toDoList[];
}

export interface getProject_getProject_project_members_user {
  __typename: "User";
  id: number;
  profileUrl: string;
  name: string;
  email: string;
  role: UserRole;
  verified: boolean;
}

export interface getProject_getProject_project_members {
  __typename: "Member";
  id: number;
  user: getProject_getProject_project_members_user;
  role: ProjectRole | null;
}

export interface getProject_getProject_project {
  __typename: "Project";
  id: number;
  createAt: any;
  updateAt: any;
  code: ProjectCode;
  name: string;
  owner: getProject_getProject_project_owner;
  githubURL: string;
  sprints: getProject_getProject_project_sprints[];
  members: getProject_getProject_project_members[];
}

export interface getProject_getProject {
  __typename: "GetProjectOutput";
  ok: boolean;
  error: string | null;
  project: getProject_getProject_project | null;
}

export interface getProject {
  getProject: getProject_getProject;
}

export interface getProjectVariables {
  input: GetProjectInput;
}
