import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {RestserviceDataSource} from '../datasources';

export interface Message {
  id: string;
  message: string;
}
export interface Helloworld {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
  getPing(): Promise<Message>;

}

export class HelloworldProvider implements Provider<Helloworld> {
  constructor(
    // restservice must match the name property in the datasource json file
    @inject('datasources.restservice')
    protected dataSource: RestserviceDataSource = new RestserviceDataSource(),
  ) {}

  value(): Promise<Helloworld> {
    return getService(this.dataSource);
  }
}
