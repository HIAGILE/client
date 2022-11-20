/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetProjectsInput, ProjectCode, UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: getProjects
// ====================================================

export interface getProjects_getProjects_projects_owner {
  __typename: "User";
  name: string;
  role: UserRole;
  email: string;
}

export interface getProjects_getProjects_projects_sprints {
  __typename: "Sprint";
  id: number;
  createAt: any;
  updateAt: any;
  startDate: any;
  endDate: any;
  period: number;
  purpose: string;
}

export interface getProjects_getProjects_projects_members_user {
  __typename: "User";
  id: number;
  profileUrl: string;
}

export interface getProjects_getProjects_projects_members {
  __typename: "Member";
  id: number;
  user: getProjects_getProjects_projects_members_user;
}

export interface getProjects_getProjects_projects {
  __typename: "Project";
  id: number;
  createAt: any;
  updateAt: any;
  code: ProjectCode;
  name: string;
  owner: getProjects_getProjects_projects_owner;
  githubURL: string;
  sprints: getProjects_getProjects_projects_sprints[];
  members: getProjects_getProjects_projects_members[];
}

export interface getProjects_getProjects {
  __typename: "GetProjectsOutput";
  ok: boolean;
  error: string | null;
  projects: getProjects_getProjects_projects[] | null;
}

export interface getProjects {
  getProjects: getProjects_getProjects;
}

export interface getProjectsVariables {
  input: GetProjectsInput;
}
