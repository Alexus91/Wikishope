import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PreloaderComponent } from './components/common/preloader/preloader.component';
import { HomePageTwoComponent } from './components/pages/home-page-two/home-page-two.component';
import { NavbarStyleOneComponent } from './components/common/navbar-style-one/navbar-style-one.component';
import { FooterStyleTwoComponent } from './components/common/footer-style-two/footer-style-two.component';
import { AboutComponent } from './components/pages/about/about.component';

import { ErrorComponent } from './components/pages/error/error.component';
import { SignInComponent } from './components/pages/sign-in/sign-in.component';
import { SignUpComponent } from './components/pages/sign-up/sign-up.component';

import { PrivacyPolicyComponent } from './components/pages/privacy-policy/privacy-policy.component';

import { ProductsComponent } from './components/pages/products/products.component';
import { CartComponent } from './components/pages/cart/cart.component';

import { ProductsDetailsComponent } from './components/pages/products-details/products-details.component';
import { BlogComponent } from './components/pages/blog/blog.component';
import { BlogDetailsComponent } from './components/pages/blog-details/blog-details.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { SidebarComponent } from './components/admin/sidebar/sidebar.component';
import { BlogManagementComponent } from './components/admin/blog-management/blog-management.component';
import { RouterModule } from '@angular/router';
import { QuillModule } from 'ngx-quill';
import { ConfirmDialogComponent } from './components/common/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    ConfirmDialogComponent,
    
    AppComponent,
    PreloaderComponent,
    HomePageTwoComponent,
    NavbarStyleOneComponent,
    FooterStyleTwoComponent,
    AboutComponent,

    ErrorComponent,
    SignInComponent,
    SignUpComponent,

    PrivacyPolicyComponent,

    ProductsComponent,
    CartComponent,

    ProductsDetailsComponent,
    BlogComponent,
    BlogDetailsComponent,
    ContactComponent,
    SignInComponent,
    SignUpComponent,
    DashboardComponent,
    SidebarComponent,
    BlogManagementComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule, 
    NgxPaginationModule,
    RouterModule,
    QuillModule.forRoot(),
    BrowserModule,
    MatDialogModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
