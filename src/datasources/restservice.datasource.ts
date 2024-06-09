import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

let bseURL = process.env.BASEURL ? process.env.BASEURL : "localhost";
let port = process.env.PORT ? process.env.PORT : 8080;
const config = {
  name: 'restservice',
  connector: 'rest',
  baseURL: `http://${bseURL}:${port}`,
  crud: false,
  options: {
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    }
  },
  operations: [
    {
      template: {
        method: 'GET',
        url: `http://${bseURL}:${port}/ping`,
      },
      functions: {
        getPing: [],
      },
    },
  ],
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class RestserviceDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'restservice';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.restservice', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
