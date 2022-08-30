import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRadioModule} from '@angular/material/radio';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { CreateComponent } from './Create/create.component';
import { CommonModule } from '@angular/common';

const appRotes:Routes=[
  {path: "",component :DashboardComponent},
  {path: "Create",component :CreateComponent }
  ];

  @NgModule({
    declarations: [
      AppComponent,
      DashboardComponent,
      CreateComponent
    ],
    imports: [
      BrowserModule,
      CommonModule,
      BrowserAnimationsModule,
      MatRadioModule,
      FormsModule,
      RouterModule.forRoot(appRotes),
      provideFirebaseApp(() => initializeApp(environment.firebase)),
      provideFirestore(() => getFirestore())
    ],
    providers: [],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
  