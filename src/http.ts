import { Injectable } from '@angular/core';
import { Http, ConnectionBackend, RequestOptions, RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { Interceptor } from './interceptor';
import { RequestArgs } from './request';

export function interceptableFactory(backend: ConnectionBackend, defaultOptions: RequestOptions, interceptors: Array<Interceptor> | Interceptor): Http {
  if (interceptors instanceof Interceptor) {
    return new InterceptableHttp(backend, defaultOptions, [interceptors])
  } else if (interceptors instanceof Array) {
    return new InterceptableHttp(backend, defaultOptions, interceptors)
  } else {
    throw new Error("Unexpected value 'interceptors' " + typeof(interceptors));
  }
}

@Injectable()
class InterceptableHttp extends Http {
  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, private interceptors: Array<Interceptor> = []) {
    super(backend, defaultOptions);
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(request => super.get(request.url, request.options))({url, options});
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(request => super.post(request.url, request.body, request.options))({url, body, options});
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(request => super.put(request.url, request.body, request.options))({url, body, options});
  }

  patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(request => super.patch(request.url, request.body, request.options))({url, body, options});
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(request => super.delete(request.url, request.options))({url, options});
  }

  options(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(request => super.options(request.url, request.options))({url, options});
  }

  head(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(request => super.head(request.url, request.options))({url, options});
  }

  private intercept(fn: (request: RequestArgs) => Observable<Response>): (request: RequestArgs) => Observable<Response> {
    return request => {
      request = this.interceptors
        .reduce((request, interceptor) => interceptor.request(request), request);

      let response = fn(request);

      return this.interceptors
        .reduce((response, interceptor) => interceptor.response(response), response);
    }
  }
}
