import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { FooterComponent } from '../app/shared/components/footer/footer.component';
import { NavBarComponent } from '../app/shared/components/nav-bar/nav-bar.component';
import { HomeComponent } from './core/views/home/home.component';
import {ProductListComponent } from './shared/components/product-list/product-list.component';
import { CategoryComponent } from './shared/components/category/category.component';
import { HeaderComponent } from './shared/components/header/header.component'

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductListComponent,
    FooterComponent,
    NavBarComponent,
    HomeComponent,
    CategoryComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
