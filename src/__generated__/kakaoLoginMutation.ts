/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { KakaoOAuthInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: kakaoLoginMutation
// ====================================================

export interface kakaoLoginMutation_kakaoLogin {
  __typename: "KakaoOAuthOutput";
  ok: boolean;
  token: string | null;
  error: string | null;
}

export interface kakaoLoginMutation {
  kakaoLogin: kakaoLoginMutation_kakaoLogin;
}

export interface kakaoLoginMutationVariables {
  kakaoOAuthInput: KakaoOAuthInput;
}
