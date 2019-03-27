import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { EventsComponent } from './events/events.component';
import { FooterComponent } from './footer/footer.component';
import { NewsComponent } from './news/news.component';
import { EboardComponent } from './eboard/eboard.component';
import { ApplyComponent } from './apply/apply.component';
import { AdminComponent } from './admin/admin.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeCarouselComponent } from './home-carousel/home-carousel.component';
import { EventRegisterModalComponent, EventRegisterModalContent } from './event-register-modal/event-register-modal.component';
import { LoginComponent } from './login/login.component';

//constant to contain all routes
const appRoutes:Routes =[
  {path: '',component: HomeComponent},
  {path: '', component: LoginComponent},
  {path: 'home',component: HomeComponent},
  {path: 'events',component: EventsComponent},
  {path: 'news',component: NewsComponent},
  {path: 'eboard',component: EboardComponent},
  {path: 'login', component: LoginComponent},
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
    ApplyComponent,
    AdminComponent,
    HomeCarouselComponent,
    EventRegisterModalComponent,
    EventRegisterModalContent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    NgbModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [EventRegisterModalContent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
