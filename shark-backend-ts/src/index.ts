import express from 'express';
import bodyParser from 'body-parser';
import './scripts/index';
// import connectMysqlToExpress from './mysql/index';
import defineServiceGroup from './services';
import defineEntityGroup from '@/entity/defineEntityGroup';

async function bootstrap() {
  const app = express();
  const PORT = 5174;

  app.use(bodyParser.json({ limit: '1mb' }));
  app.use(bodyParser.urlencoded({
    extended: true,
  }));

  app.all('*', (req, res, next) => {
    // res.header("Access-Control-Allow-Origin","*");
    // res.header("Access-Control-Allow-Origin","http://localhost:8600");
    (res.header as typeof res.header)('Access-Control-Allow-Origin', '*');
    (res.header as typeof res.header)('Access-Control-Allow-Origin', '*');
    (res.header as typeof res.header)('Access-Control-Allow-Headers', 'content-type,token');
    (res.header as typeof res.header)('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS');
    (res.header as typeof res.header)('Access-Control-Allow-Cre', 'DELETE,PUT,POST,GET,OPTIONS');
    (res.header as typeof res.header)('Access-Control-Allow-Credentials', 'true');
    next();
  });

  defineEntityGroup({ app });
  defineServiceGroup({ app });

  app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
  });
}

bootstrap()
  .catch((error) => {
    console.log('load server error');
    console.log(error);
  });
