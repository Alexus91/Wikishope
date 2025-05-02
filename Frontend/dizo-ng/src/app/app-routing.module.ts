import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageTwoComponent } from './components/pages/home-page-two/home-page-two.component';
import { AboutComponent } from './components/pages/about/about.component';
import { ErrorComponent } from './components/pages/error/error.component';
import { SignInComponent } from './components/pages/sign-in/sign-in.component';
import { SignUpComponent } from './components/pages/sign-up/sign-up.component';
import { ProductsComponent } from './components/pages/products/products.component';
import { CartComponent } from './components/pages/cart/cart.component';
import { ProductsDetailsComponent } from './components/pages/products-details/products-details.component';
import { BlogComponent } from './components/pages/blog/blog.component';
import { BlogDetailsComponent } from './components/pages/blog-details/blog-details.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { BlogManagementComponent } from './components/admin/blog-management/blog-management.component';

const routes: Routes = [
    {path: 'home-two', component: HomePageTwoComponent},
    {path: 'about', component: AboutComponent},
    {path: 'error', component: ErrorComponent},
    {path: 'sign-in', component: SignInComponent},
    {path: 'sign-up', component: SignUpComponent},
    {path: 'product', component: ProductsComponent},
    {path: 'cart', component: CartComponent},
    {path: 'product-details', component: ProductsDetailsComponent},
    {path: 'blog', component: BlogComponent},
    {path: 'blog-details/:id', component: BlogDetailsComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'admin/dashboard', component: DashboardComponent },
    {path: 'admin/blog-management', component: BlogManagementComponent },
    { path: '**', component: ErrorComponent } // Wildcard route should be placed at the end

];

@NgModule({
    imports: [RouterModule.forRoot(routes, {})],
    exports: [RouterModule]
})
export class AppRoutingModule { }