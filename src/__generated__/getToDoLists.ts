/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetToDoListsInput, ToDoListStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: getToDoLists
// ====================================================

export interface getToDoLists_getToDoLists_toDoLists_sprint {
  __typename: "Sprint";
  id: number;
  createAt: any;
  updateAt: any;
  startDate: any;
  endDate: any;
  period: number;
  purpose: string;
}

export interface getToDoLists_getToDoLists_toDoLists_members_user {
  __typename: "User";
  id: number;
  profileUrl: string;
  name: string;
}

export interface getToDoLists_getToDoLists_toDoLists_members {
  __typename: "Member";
  id: number;
  user: getToDoLists_getToDoLists_toDoLists_members_user;
}

export interface getToDoLists_getToDoLists_toDoLists {
  __typename: "ToDoList";
  id: number;
  createAt: any;
  updateAt: any;
  status: ToDoListStatus;
  title: string;
  description: string;
  sprint: getToDoLists_getToDoLists_toDoLists_sprint | null;
  members: getToDoLists_getToDoLists_toDoLists_members[] | null;
}

export interface getToDoLists_getToDoLists {
  __typename: "GetToDoListsOutput";
  ok: boolean;
  error: string | null;
  toDoLists: getToDoLists_getToDoLists_toDoLists[] | null;
}

export interface getToDoLists {
  getToDoLists: getToDoLists_getToDoLists;
}

export interface getToDoListsVariables {
  input: GetToDoListsInput;
}
