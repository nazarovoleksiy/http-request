import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";


export class AuthInterceptorSevice implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {

    console.log('Request on its way');
    return next.handle(req);
  }

}
