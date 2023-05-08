import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoaderComponent } from './loader/loader.component';
import {AuthInterceptorSevice} from "./auth-interceptor.sevice";

@NgModule({
  declarations: [AppComponent, LoaderComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorSevice,
    multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
