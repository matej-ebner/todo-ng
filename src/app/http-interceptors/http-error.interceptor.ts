import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { ErrorsService } from 'src/app/services/errors.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private errorService: ErrorsService) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            retry(1),
            catchError((error: HttpErrorResponse) => {
                if (!environment.production) {
                    console.log(error);
                }

                this.errorService.handleError(error);
                return throwError(error);
            })
        );
    }
}
