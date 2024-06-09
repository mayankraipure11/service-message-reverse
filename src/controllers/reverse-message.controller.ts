import {inject} from '@loopback/core';
import {
  Request,
  ResponseObject,
  RestBindings,
  get,
  response
} from '@loopback/rest';

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
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}

  // Map to `GET /ping`
  @get('/reverse')
  @response(200, REVERSE_RESPONSE)
  reverse(): object {
    // Reply with a greeting, the current time, the url, and request headers
    let revStr:String = this.reverseString("Hello world");
    return {
      id: "1",
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
