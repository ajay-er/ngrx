import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AboutComponent } from './about/about.component';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { StoreModule } from '@ngrx/store';
import { ProductModule } from './products/product.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProductData } from './products/product.data';
import { UserModule } from './user/user.module';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './products/state/product.effects';

@NgModule({
  declarations: [AppComponent, NavComponent, AboutComponent, NotFoundComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProductModule,
    UserModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(ProductData,{ delay: 500 }),
    EffectsModule.forRoot([ProductEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
