import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SelectionComponent } from './algorithms/algorithms-container/selection/selection.component';
import { AlgorithmsContainerComponent } from './algorithms/algorithms-container/algorithms-container.component';

@NgModule({
  declarations: [
    AppComponent,
    SelectionComponent,
    AlgorithmsContainerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
