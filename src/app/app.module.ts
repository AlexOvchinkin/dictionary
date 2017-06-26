import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SelectionComponent } from './algorithms/algorithms-container/selection/selection.component';
import { AlgorithmsContainerComponent } from './algorithms/algorithms-container/algorithms-container.component';
import { TranslateComponent } from './algorithms/algorithms-container/translate/translate.component';

@NgModule({
  declarations: [
    AppComponent,
    SelectionComponent,
    AlgorithmsContainerComponent,
    TranslateComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
