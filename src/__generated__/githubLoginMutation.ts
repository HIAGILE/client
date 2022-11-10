/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GitHubOAuthInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: githubLoginMutation
// ====================================================

export interface githubLoginMutation_githubLogin {
  __typename: "GitHubOAuthOutput";
  ok: boolean;
  token: string | null;
  error: string | null;
}

export interface githubLoginMutation {
  githubLogin: githubLoginMutation_githubLogin;
}

export interface githubLoginMutationVariables {
  gitHubOAuthInput: GitHubOAuthInput;
}
