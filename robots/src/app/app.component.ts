import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ServerServiceService } from './service/server-service.service';
import { collectionSnapshots, doc, DocumentSnapshot, Firestore, getDoc, getDocs, query } from '@angular/fire/firestore';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  Items: any[]=[];
  crops: any[]=[];
  constructor(private service: ServerServiceService, private db: Firestore){
  }
  ngOnInit() {
    collectionSnapshots(this.service.getAll()).pipe(
      map((changes) => {
        return changes.map((c) => {
          return ({ id: c.id, ...c.data() })
        })
      })
    ).subscribe(data => {
      this.Items = data;
    });
    
}

}
