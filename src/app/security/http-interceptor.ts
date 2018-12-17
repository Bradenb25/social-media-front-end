import { HttpEvent, HttpRequest, HttpInterceptor, HttpHandler, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable, NgModule } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "../shared/models/user";
import { SecurityObject } from "../shared/models/security-object";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {

        let url = environment.baseUrl + '/api' + req.url;

        const httpRequest = new HttpRequest(<any>req.method, url, req.body, {headers: req.headers});
        req = Object.assign(req, httpRequest);

        var secObject: SecurityObject = JSON.parse(localStorage.getItem("bearer"));
        if (secObject) {
            const newReq = req.clone({
                headers: req.headers.set("Authorization",
                    "Bearer " + secObject.jwtToken)
            });
            return next.handle(newReq);
        } else {

            return next.handle(req);
        }
    }
}

@NgModule({
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpRequestInterceptor,
            multi: true
        }
    ]
})
export class HttpInterceptorModule { }