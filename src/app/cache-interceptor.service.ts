import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { observable, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

export class CacheInterceptor implements HttpInterceptor {
  private cache: Map<HttpRequest<any>, HttpResponse<any>> = new Map();
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.method !== 'GET') {
      return next.handle(req);
    }

    const cachedResponse = this.cache.get(req);

    if (cachedResponse) {
      console.log('cached response');
      return of(cachedResponse.clone());
    } else {
      return next.handle(req).pipe(
        tap((event) => {
          if (event.type == HttpEventType.Response) {
            this.cache.set(req, event.body);
          }
        })
      );
    }
  }
}
