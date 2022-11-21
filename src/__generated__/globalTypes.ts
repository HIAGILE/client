/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum ProjectCode {
  EX = "EX",
  KANBAN = "KANBAN",
  PAIR = "PAIR",
  SCRUM = "SCRUM",
}

export enum ProjectRole {
  Leader = "Leader",
  member = "member",
}

export enum ToDoListStatus {
  DONE = "DONE",
  INPROGRESS = "INPROGRESS",
  TODO = "TODO",
}

export enum UserRole {
  Client = "Client",
  Master = "Master",
}

export interface AddMembersInput {
  projectId: number;
  members: ProjectMemberInput[];
}

export interface CreateAccountInput {
  name: string;
  email: string;
  password: string;
}

export interface CreateProjectInput {
  code: ProjectCode;
  name: string;
  githubURL: string;
}

export interface GetFriendsInput {
  userId: number;
}

export interface GetProjectInput {
  id: number;
}

export interface GetProjectsInput {
  id: number;
}

export interface GitHubOAuthInput {
  code: string;
}

export interface KakaoOAuthInput {
  code: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface ProjectMemberInput {
  userId: number;
  role: string;
}

export interface ValidateAccountInput {
  email: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
