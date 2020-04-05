import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { NewArticleComponent } from './components/new-article/new-article.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuard } from "./services/authservices/auth.guard";
import { EditArticleComponent } from './components/edit-article/edit-article.component';


const routes: Routes = [
 
  { path: 'home', component: HomeComponent ,},
  { path: "signup", component:SignUpComponent},
  { path: "signin",component:SignInComponent},
  { path: "myarticle",component:NewArticleComponent,canActivate: [AuthGuard]},
  { path: "settings",component: SettingsComponent,canActivate: [AuthGuard]},
  { path: "editor",component:EditArticleComponent},
  { path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
