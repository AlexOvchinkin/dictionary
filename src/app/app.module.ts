import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SelectionComponent} from './algorithms/algorithms-container/selection/selection.component';
import {AlgorithmsContainerComponent} from './algorithms/algorithms-container/algorithms-container.component';
import {TranslateComponent} from './algorithms/algorithms-container/translate/translate.component';
import {EnterComponent} from './enter/enter.component';
import {Route, RouterModule} from "@angular/router";
import {AUTHORISATION_PAGE, ENTER_PAGE, HOME_PAGE, REGISTRATION_PAGE, TRAINING_PAGE} from "./types";
import {HeaderComponent} from './header/header.component';
import {RegistrationComponent} from './registration/registration.component';
import {AuthorisationComponent} from './authorisation/authorisation.component';
import {AuthService} from "./auth.service";
import {AuthGuard} from "./guards/auth-guard";
import {WelcomeComponent} from './welcome/welcome.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CanDeactivateGuard} from "./guards/can-deactivate.guard";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MdButtonModule} from "@angular/material";
import { PreloaderComponent } from './preloader/preloader.component';
import { FooterComponent } from './footer/footer.component';

const routes: Route[] = [
    {path: HOME_PAGE, component: WelcomeComponent},
    {path: ENTER_PAGE, component: EnterComponent},
    {
        path: TRAINING_PAGE,
        component: AlgorithmsContainerComponent,
        canActivate: [AuthGuard],
        canDeactivate: [CanDeactivateGuard]
    },
    {path: REGISTRATION_PAGE, component: RegistrationComponent},
    {path: AUTHORISATION_PAGE, component: AuthorisationComponent}
];

@NgModule({
    declarations: [
        AppComponent,
        SelectionComponent,
        AlgorithmsContainerComponent,
        TranslateComponent,
        EnterComponent,
        HeaderComponent,
        RegistrationComponent,
        AuthorisationComponent,
        WelcomeComponent,
        PreloaderComponent,
        FooterComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MdButtonModule
    ],
    providers: [AuthService, AuthGuard, CanDeactivateGuard],
    bootstrap: [AppComponent]
})
export class AppModule {
}









