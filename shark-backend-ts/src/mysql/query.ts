import mysql from 'mysql';
import type { FieldInfo } from 'mysql';
import { generateResponse } from '@/utils';
import { responseType } from '@/enums';
import mysqlConfig from './config';

const pool = mysql.createPool({
  ...mysqlConfig,
  connectionLimit: 999,
});

interface QueryConfig {
  sql: string,
  successHandler?: (results: any, fieldsInfo: FieldInfo[]) => void,
  errorHandler?: (error: mysql.MysqlError) => void,
  log?: boolean
}
export default (queryConfig: QueryConfig): Promise<{ results: any, fields: FieldInfo[] } | null> => {
  const {
    sql,
    successHandler,
    errorHandler = ((error) => {
      throw generateResponse({
        type: responseType.Fatal,
        message: error.sqlMessage,
      });
    }),
    log = false,
  } = queryConfig;

  log && console.log(sql);

  return new Promise((resolve) => {
    pool.query(sql, (error, results, fields) => {
      if (error) {
        errorHandler(error);
        return;
      }

      successHandler ? successHandler(results, fields) : resolve({ results, fields });
    });
  });
};
