import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { PrependBaseUrlInterceptor } from './prepend-base-url.interceptor';

export const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: PrependBaseUrlInterceptor,
    multi: true,
  },
];
