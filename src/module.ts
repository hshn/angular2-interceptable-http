import { Http, RequestOptions, HttpModule, XHRBackend } from '@angular/http';
import { NgModule } from '@angular/core';
import { interceptableFactory } from './http';
import { Interceptor } from './interceptor';

@NgModule({
  imports: [
    HttpModule,
  ],
  providers: [
    { provide: Http, useFactory: interceptableFactory, deps: [XHRBackend, RequestOptions, Interceptor] }
  ]
})
export class InterceptableHttpModule {
}
