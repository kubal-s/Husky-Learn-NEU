import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { NewArticleComponent } from './new-article/new-article.component';
import { SettingsComponent } from './settings/settings.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from "./authservices/auth.guard";


const routes: Routes = [
 
  { path: 'home', component: HomeComponent ,},
  { path: "signup", component:SignUpComponent},
  { path: "signin",component:SignInComponent},
  { path: "myarticle",component:NewArticleComponent},
  { path: "settings",component: SettingsComponent,canActivate: [AuthGuard]},
  { path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
