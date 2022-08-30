import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { RobotComponent } from './robot/robot.component';
import { RouterModule, Routes } from '@angular/router';
import { UpdateComponent } from './update/update.component';

const appRoutes : Routes = [
  {path: "", component: RobotComponent},
  {path: "Update", component: UpdateComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    RobotComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
