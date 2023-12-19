import type { request } from 'express';
import type { GResponse } from 'utils/generateResponse';
import { MaybePromise } from 'rollup';
import {
  requestType,
  requestParamType,
} from '@/enums';
import type query from '../mysql/query';

type ParamConfig = {
  type: requestParamType,
  default?: any | (() => any),
  required?: boolean
}

type GetParam = {
  [k: string]: requestParamType | ParamConfig
}
type PostParam = {
  [k: string]: requestParamType | ParamConfig
}
type E2SMapParam = GetParam | PostParam

interface Entity2ServiceMap {
  requestType: requestType
  sql?: string,
  autoInject?: boolean,
  param?: E2SMapParam,
  message?: string,
  isCustom?: boolean,
  handler?: (
    req: typeof request,
    sql: string,
    query: query
  ) => MaybePromise<GResponse>
}

type E2SMap = Entity2ServiceMap | (() => Entity2ServiceMap)
