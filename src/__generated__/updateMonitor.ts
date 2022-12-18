/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateMonitorInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: updateMonitor
// ====================================================

export interface updateMonitor_updateMonitor {
  __typename: "UpdateMonitorOutput";
  ok: boolean;
  error: string | null;
}

export interface updateMonitor {
  updateMonitor: updateMonitor_updateMonitor;
}

export interface updateMonitorVariables {
  input: UpdateMonitorInput;
}
