import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { SharedModule } from "./shared-modules/shared/shared.module";
import { MenuModule } from "./components/menu/menu.module";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ServerMockInterceptor } from "./http-interceptors/server-mock.interceptor";
import { ErrorModule } from "./components/error/error.module";
import { HttpErrorInterceptor } from "./http-interceptors/http-error.interceptor";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    MenuModule,
    ErrorModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerMockInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
