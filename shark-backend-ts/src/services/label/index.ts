import { requestParamType, requestType } from '@/enums';
import { addParamToSql, generateResponse, transformEntityToJson } from '@/utils';
import defineE2SMap from '@/services/defineE2SMap';

const getAllLabelByUser = defineE2SMap(() => ({
  requestType: requestType.Get,
  sql: `select u.label_id, label_name, label_type, label_icon, rank_index 
        from user_label u JOIN label l 
        on u.label_id = l.label_id 
        where u.user_id = ?`,
  autoInject: false,
  handler: async (req, sql, query) => {
    const result = (await query({
      sql: addParamToSql({
        sql,
        param: {
          userId: requestParamType.ParamString,
        },
        query: {
          userId: req.header('token'),
        },
      }),
    })).results;

    return generateResponse({
      data: {
        list: transformEntityToJson(result),
      },
    });
  },
}));

export default {
  getAllLabelByUser,
};
