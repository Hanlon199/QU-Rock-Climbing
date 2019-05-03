import { BrowserModule } from '@angular/platform-browser';
import { NgModule,NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { EventsComponent } from './events/events.component';
import { EventRegisterModalComponent, EventRegisterModalContent } from './event-register-modal/event-register-modal.component';
import { FooterComponent } from './footer/footer.component';
import { NewsComponent } from './news/news.component';
import { EboardComponent } from './eboard/eboard.component';
import { ApplyComponent } from './apply/apply.component';
import { AdminComponent } from './admin/admin.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeCarouselComponent } from './home-carousel/home-carousel.component';
import { LoginComponent } from './login/login.component';
import { TestUserComponent } from './test-user/test-user.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { PendingComponent } from './pending/pending.component'
import {MainPipe} from './includes/pipe/main-pipe'
import { JwtModule } from '@auth0/angular-jwt';
//services
import { AuthGuardService as AuthGuard, AuthGuardService } from './auth-guard';
import {CommonService} from './common.service';
import {CommonUserService} from './admin/common.adminUserService'
import {CommonEventService} from './admin/common.adminEventService'
import {CommonNewsService} from './admin/common.adminNewsService'
import {CommonEboardService} from './admin/common.adminEboardService'
import {CommonAuthService} from './login/common.loginAuthService'
import {CommonApplicantService} from './apply/common.applicantService';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UtilityService } from './utility.service';

//constant to contain all routes
const appRoutes:Routes =[
  {path: '',component: HomeComponent},
  {path: 'home',component: HomeComponent},
  {path: 'events',component: EventsComponent},
  {path: 'news',component: NewsComponent},
  {path: 'eboard',component: EboardComponent},
  {path: 'login', component: LoginComponent},
  {path: 'admin',component: AdminComponent, canActivate: [AuthGuard]},
  {path: 'apply',component: ApplyComponent},
  {path: 'pending',component: PendingComponent},
  {path: 'sign-up',component: SignUpComponent},
  {path: 'test',component: TestUserComponent}
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
    LoginComponent,
    TestUserComponent,
    EventRegisterModalComponent,
    EventRegisterModalContent,
    PendingComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    MDBBootstrapModule.forRoot(),
    NgbModule,
    MainPipe,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return sessionStorage.getItem('SESSIONID');
        },
        whitelistedDomains: ['localhost:4200', 'localhost:3000']
      }
    })
  ],
  providers: [
    CommonService,
    CommonUserService,
    CommonEventService, 
    CommonNewsService, 
    CommonEboardService, 
    CommonAuthService, 
    CommonApplicantService,
    AuthGuardService,
    UtilityService
    ],
  bootstrap: [AppComponent],
  entryComponents: [EventRegisterModalContent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
