import { identifierName } from '@angular/compiler';
import { Component } from '@angular/core';
import { collectionSnapshots, doc, DocumentSnapshot, Firestore, getDoc, getDocs, query } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { ServerServiceService } from './service/server-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dashbord';
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

  getSubCollection(it: any){
    /*collectionSnapshots(this.service.getSubCollection(it)).pipe(
      map((changes) => {
        return changes.map((c) => {
          return ({ id: c.id, ...c.data() })
        })
      })
    ).subscribe(data => {
      for(let i of data){
        this.crops.push(i);
      }
    }); */
  }
  getSubDocument(it: any){
    /*let crop : {name:string, id:string} = {name:"aya", id:"3"};
    this.service.getDocument("1").then((data: DocumentSnapshot) => {
      crop.name = data?.data()?.['name'];
      crop.id = data.id;
      console.log(data.data());
    });
    this.crops.push(crop);
  } ;*/
    let crop : {name:string, id:string} = {name:"aya", id:"3"}
    this.service.getSubDocument(it, "1").then((data: DocumentSnapshot) => {
      crop.name = data?.data()?.['name'];
      crop.id = data.id;
      console.log(data.data());
    });
    this.crops.push(crop);
  }

}
