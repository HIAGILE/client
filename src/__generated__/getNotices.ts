/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getNotices
// ====================================================

export interface getNotices_getNotices_notices {
  __typename: "Notice";
  createAt: any;
  updateAt: any;
  description: string;
  id: number;
}

export interface getNotices_getNotices {
  __typename: "GetNoticesOutput";
  ok: boolean;
  error: string | null;
  notices: getNotices_getNotices_notices[] | null;
}

export interface getNotices {
  getNotices: getNotices_getNotices;
}
