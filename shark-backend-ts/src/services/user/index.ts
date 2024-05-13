import {
  requestType,
  requestParamType,
} from '@/enums';
import {
  dayjsPlus,
} from '@/utils';
import defineE2SMap from '@/services/defineE2SMap';

const getUser = defineE2SMap(() => ({
  requestType: requestType.Get,
  sql: 'select * from user',
}));

const insertUser = defineE2SMap(() => ({
  requestType: requestType.Post,
  sql: 'insert into user (user_name, last_updated) values (?, ?)',
  param: {
    lastUpdated: {
      type: requestParamType.ParamDate,
      default: () => dayjsPlus.dayjsF(),
    },
    userName: {
      type: requestParamType.ParamString,
      required: true,
    },
  },
  message: 'add user success',
}));

export default {
  getUser,
  insertUser,
};
