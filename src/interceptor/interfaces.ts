import { Response, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs';
import { RequestArgs } from '../request';

export abstract class Interceptor {
  abstract request(request: RequestArgs): RequestArgs;
  abstract response(response: Observable<Response>): Observable<Response>;
}

export abstract class InterceptorAdapter extends Interceptor {
  constructor() {
    super();
  }

  request(request: RequestArgs): RequestArgs {
    return request;
  }

  response(response: Observable<Response>): Observable<Response> {
    return response;
  }
}

function noop<A>(a: A): A {
  return a;
}

export class ClosureInterceptor extends Interceptor {
  static request(request: InterceptRequest): Interceptor {
    return new ClosureInterceptor(request, noop);
  }

  static response(response: InterceptResponse): Interceptor {
    return new ClosureInterceptor(noop, response);
  }

  private _request: InterceptRequest;
  private _response: InterceptResponse;

  constructor(request: InterceptRequest, response: InterceptResponse) {
    super();

    this._request = request;
    this._response = response;
  }

  request(request: RequestArgs): RequestArgs {
    return this._request(request);
  }

  response(response: Observable<Response>): Observable<Response> {
    return this._response(response);
  }
}

export interface RequestArgs {
  url: string
  body?: string
  options?: RequestOptionsArgs
}

export interface InterceptRequest {
  (request: RequestArgs): RequestArgs
}

export interface InterceptResponse {
  (response: Observable<Response>): Observable<Response>
}
