import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { EventsComponent } from './events/events.component';
import { FooterComponent } from './footer/footer.component';
import { NewsComponent } from './news/news.component';
import { EboardComponent } from './eboard/eboard.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { ApplyComponent } from './apply/apply.component';
import { AdminComponent } from './admin/admin.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//constant to contain all routes
const appRoutes:Routes =[
  {path: '',component: HomeComponent},
  {path: 'home',component: HomeComponent},
  {path: 'events',component: EventsComponent},
  {path: 'news',component: NewsComponent},
  {path: 'eboard',component: EboardComponent},
  {path: 'admin',component: AdminComponent},
  {path: 'apply',component: ApplyComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    NavComponent,
    EventsComponent,
    FooterComponent,
    NewsComponent,
    EboardComponent,
    LoginModalComponent,
    ApplyComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
