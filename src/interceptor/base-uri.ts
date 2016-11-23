import { InterceptorAdapter } from './interfaces';
import { RequestArgs } from '../request';

export class BaseUriInterceptor extends InterceptorAdapter {
  constructor(private baseUri: string) {
    super()
  }

  request(request: RequestArgs): RequestArgs {
    let { url, body, options } = request;

    return {
      url: this.baseUri + url,
      body,
      options
    }
  }
}
