import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SelectionComponent} from './algorithms/algorithms-container/selection/selection.component';
import {AlgorithmsContainerComponent} from './algorithms/algorithms-container/algorithms-container.component';
import {TranslateComponent} from './algorithms/algorithms-container/translate/translate.component';
import {EnterComponent} from './enter/enter.component';
import {Route, RouterModule} from "@angular/router";
import {HOME_PAGE, TRAINING_PAGE} from "./types";

const routes: Route[] = [
    { path: HOME_PAGE, component: EnterComponent },
    { path: TRAINING_PAGE, component: AlgorithmsContainerComponent }
];

@NgModule({
    declarations: [
        AppComponent,
        SelectionComponent,
        AlgorithmsContainerComponent,
        TranslateComponent,
        EnterComponent
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









