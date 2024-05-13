import type { Entity2ServiceMap } from 'types/service';
import user from './user/index';
import label from './label/index';
import {
  addParamToSql, catPath, executeFunctionOrNot, generateResponse, transformEntityToJson,
} from '@/utils';
import query from '@/mysql/query';
import { requestType, responseType } from '@/enums';

export default function defineServiceGroup({ app }) {
  e2s2Express(user);
  e2s2Express(label);

  function e2s2Express(e2sModule: {
    [x: string]: Entity2ServiceMap
  }) {
    Object.keys(e2sModule).forEach((moduleKey) => {
      const {
        requestUrl,
        requestType: rqType,
        sql,
        param,
        autoInject = false,
        message = 'success',
        handler,
      } = executeFunctionOrNot(e2sModule[moduleKey]);
      const _requestUrl = catPath(requestUrl || moduleKey);

      app[rqType](_requestUrl, async (request, response) => {
        try {
          let _sql = sql;
          if (param && autoInject) {
            _sql = addParamToSql({
              param,
              sql,
              query: rqType === requestType.Get ? request.query : request.body,
            });
          }

          let result = {
            type: responseType.Success,
            message,
            data: {
              list: [],
            },
          };
          if (handler) {
            result = await handler(request, _sql, query);
          } else {
            result.data.list = transformEntityToJson((await query(_sql)).results);
          }

          response.json(result);
        } catch (e) {
          if (e.type) {
            e.type === responseType.Error && response.json(e);
            e.type === responseType.Fatal && response.json(e);
          } else {
            response.json(generateResponse({
              type: responseType.Fatal,
              message: e.message,
            }));
          }
        }
      });
    });
  }
}
