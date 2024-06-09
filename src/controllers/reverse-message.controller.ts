import {inject} from '@loopback/core';
import {
  Request,
  ResponseObject,
  RestBindings,
  get,
  response
} from '@loopback/rest';
import { RestserviceDataSource  } from '../datasources';
import { Helloworld,Message  } from '../services';

const REVERSE_RESPONSE: ResponseObject = {
  description: 'Ping Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        title: 'PingResponse',
        properties: {
          id: {type: "string"},
          message: {type: "string"}
        },
      },
    },
  },
};



export class ReverseMessageController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request, @inject('services.Helloworld')
  protected helloWorldService: Helloworld) {}
  
  //get third party service
  @get('/ping')
  async getMessage(): Promise<Message> {
    return this.helloWorldService.getPing();
  }

   
  @get('/reverse')
  @response(200, REVERSE_RESPONSE)
  async reverse(): Promise<object> {
    let msgJson: Message = await this.getMessage();
    // Reply with a greeting, the current time, the url, and request headers
    let revStr:String = this.reverseString(msgJson.message);
    return {
      id: msgJson.id,
      message: revStr
    };
  }

  private reverseString(str:String): String {
    if (str === "") // This is the terminal case that will end the recursion
    return "";

  else
    return this.reverseString(str.substr(1)) + str.charAt(0);
  }
}
