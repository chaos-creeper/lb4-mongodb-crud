import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

//conexion local
/*
const config = {
  name: 'mongodb', // nombre de la clase de conexion
  connector: 'mongodb',
  url: '',
  host: 'localhost',
  port: 27017,
  user: '',
  password: '',
  database: 'pruebas', //nombre de la base de datos
  useNewUrlParser: true
};
*/

//conexion atlas mongodb

const config = {
  name: 'mongodb', // nombre de la clase que contiene la cadena de conexion <datasource>
  connector: 'mongodb',
  url: 'mongodb+srv://<user>:<password>@dbcluster.sptdn.mongodb.net/<database>?retryWrites=true&w=majority',
  host: 'dbcluster.sptdn.mongodb.net',
  port: 27017,
  user: '<user>',
  password: '<password>',
  database: '<database>', //nombre de la base de datos
  useNewUrlParser: false
};


// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MongodbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'mongodb';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.mongodb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
