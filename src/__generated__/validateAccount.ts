/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ValidateAccountInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: validateAccount
// ====================================================

export interface validateAccount_validateAccount {
  __typename: "ValidateAccountOutput";
  ok: boolean;
  error: string | null;
}

export interface validateAccount {
  validateAccount: validateAccount_validateAccount;
}

export interface validateAccountVariables {
  input: ValidateAccountInput;
}
