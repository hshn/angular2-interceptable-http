import { InterceptorAdapter } from './interfaces';
import { RequestArgs } from '../request';

export class UriPrefixInterceptor extends InterceptorAdapter {
  constructor(private prefix: string) {
    super()
  }

  request(request: RequestArgs): RequestArgs {
    let { url, body, options } = request;

    return {
      url: this.prefix + url,
      body,
      options
    }
  }
}
