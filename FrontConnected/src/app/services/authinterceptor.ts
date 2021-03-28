import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private authService: AuthenticationService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authService.isUserLoggedin() && req.url.indexOf('basicauth') === -1) {
            const request = req.clone({
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${window.btoa(this.authService.email + ":" + this.authService.password)}`
                })
            });
            return next.handle(request);
        }
        
		return next.handle(req);
    }
}