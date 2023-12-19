import type { request } from 'express';
import type { E2SMapParam } from 'types/service';
import generateResponse from 'utils/generateResponse';
import checkParamType from 'utils/checkParamType';
import executeFunctionOrNot from 'utils/executeFunctionOrNot';
import ResponseType from 'enums/responseType';
import { responseType } from '@/enums';

export enum SqlType {
  Select = 'select',
  Insert = 'insert',
  Update = 'update',
  Delete = 'delete',
  Truncate = 'truncate'
}

export default function addParamToSql({
  param,
  sql,
  query,
} = {} as {
  param: E2SMapParam,
  sql: string,
  query?: typeof request.query,
}) {
  const injectParam = Object.keys(param).reduce((result, pKey) => {
    const pItem = param[pKey];
    const isJustRequestType = typeof pItem === 'string';

    const pType = isJustRequestType ? pItem : pItem.type;
    const pConfig = {
      type: pType,
      default: isJustRequestType
        ? query[pKey]
        : query[pKey] || executeFunctionOrNot(pItem.default),
      required: isJustRequestType ? false : pItem.required,
      key: pKey,
    };

    const { pass, message, defaultValue } = checkParamType(pConfig);
    if (!pass) {
      throw generateResponse({
        type: responseType.Error,
        message: message(pKey),
      });
    }

    defaultValue && (pConfig.default = defaultValue);

    result[pKey] = pConfig;
    return result;
  }, {});

  const sqlType = sql.split(' ').shift();

  switch (sqlType) {
    case SqlType.Select:
      const orderInSelect = Object.keys(injectParam).map((key) => injectParam[key].default);

      return sql.replaceAll('?', () => orderInSelect.shift());
    case SqlType.Insert:
      const orderInInsert = sql
        .slice(sql.indexOf('(') + 1, sql.indexOf(')'))
        .split(',')
        .map((insertParam: string) => insertParam.split('_').map((letter, i) => (i === 0
          ? letter
          : `${letter[0].toUpperCase()}${letter.slice(1)}`)).join(''));

      return sql.replaceAll('?', () => `'${injectParam[orderInInsert.shift().trim()].default}'`);
    default:
      throw generateResponse({
        type: ResponseType.Error,
        message: 'sql error, please check your sql syntax',
      });
  }
}
