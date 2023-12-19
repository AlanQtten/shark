import type ResponseType from 'enums/responseType';
import { responseType } from '@/enums';

export type GResponse = {
  type?: ResponseType,
  message?: string,
  data?: any
}

export default function generateResponse(gResponse: GResponse): GResponse {
  gResponse.type = gResponse.type || responseType.Success;
  gResponse.message = gResponse.message || 'request success';
  gResponse.data = gResponse.data || {};

  return gResponse;
}
