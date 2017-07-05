import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CreateSnippetComponent } from './create-snippet/create-snippet.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateSnippetComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
