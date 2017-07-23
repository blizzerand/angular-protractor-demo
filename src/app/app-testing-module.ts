import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Components
import { AppComponent } from './app.component';
import { PastebinComponent } from './pastebin/pastebin.component';
import { ViewPasteComponent } from './view-paste/view-paste.component';
import { AddPasteComponent } from './add-paste/add-paste.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

//Service for Pastebin

import { PastebinService } from "./pastebin.service";

//Modules used in this tutorial
import { HttpModule }    from '@angular/http';
import {FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';


//In memory Web api to simulate an http server
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';



const appRoutes :Routes = [
  { path: '', component: PastebinComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent},
  ];

//Define the Routes for the Pastebin Application

@NgModule({
  declarations: [
    AppComponent,
    PastebinComponent,
    ViewPasteComponent,
    AddPasteComponent,
    AboutComponent,
    ContactComponent,
  ],
  
  imports: [
    BrowserModule, 
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    RouterModule.forRoot(appRoutes),
     
   
  ],
  providers: [PastebinService,
  {provide: APP_BASE_HREF, useValue: '/'}],
 
})
export class AppTestingModule { }

