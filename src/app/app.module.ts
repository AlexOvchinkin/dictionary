import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SelectionComponent} from './algorithms/algorithms-container/selection/selection.component';
import {AlgorithmsContainerComponent} from './algorithms/algorithms-container/algorithms-container.component';
import {TranslateComponent} from './algorithms/algorithms-container/translate/translate.component';
import {EnterComponent} from './enter/enter.component';
import {Route, RouterModule} from "@angular/router";
import {HOME_PAGE, REGISTRATION_PAGE, TRAINING_PAGE} from "./types";
import { HeaderComponent } from './header/header.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthorisationComponent } from './authorisation/authorisation.component';

const routes: Route[] = [
    { path: HOME_PAGE, component: EnterComponent },
    { path: TRAINING_PAGE, component: AlgorithmsContainerComponent },
    { path: REGISTRATION_PAGE, component: RegistrationComponent }
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
        AuthorisationComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}









