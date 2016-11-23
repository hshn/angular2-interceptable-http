# angular2-interceptable-http

# Features

 - No need to change `Http` type interface.
 - Predefined interceptors. (PR welcome!)

# Installation

```shell
 npm i angular2-inteceptable-http
```

# Usage

## Import `InterceptableHttpModule`

```js
import { InterceptableHttpModule } from 'angular2-interceptable-http';
import { AppComponent } './app.component';

@NgModule({
  imports: [
    InterceptableHttpModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Register intercepros using `Provider`

```js
import { InterceptableHttpModule, Interceptor, ClosureInterceptor, UriPrefixInterceptor } from 'angular2-interceptable-http';
import { AppComponent } './app.component';

@NgModule({
  imports: [
    InterceptableHttpModule
  ],
  providers: [{
    provide: Interceptor,
    multi: true
    useValue: ClosureInterceptor.request(request => {
      let { url, body, options } = request;

      // Write interception logic here.

      return { url, body, options }
    })
  }, {
    provide: Interceptor,
    multi: true
    useValue: new UriPrefixInterceptor('http://localhost:8080/api')
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Predefined

### UriPrefixInterceptor

```
UriPrefixInterceptor(prefix: string)
```

# TODO

 - [ ] test
 - [ ] doc
