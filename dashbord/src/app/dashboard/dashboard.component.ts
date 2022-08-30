import { Component, Input, OnInit } from '@angular/core';
import { collectionSnapshots } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { ServerServiceService } from '../service/server-service.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent  {Items: any[]=[];
  crops: any[] = [];
  curr_item: any;
  constructor(private service: ServerServiceService) { }

  ngOnInit(): void {
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

  btnClick(item:any){
    this.curr_item = item;
      collectionSnapshots(this.service.getSubCollection(item)).pipe(
        map((changes) => {
          return changes.map((c) => {
            return ({ id: c.id, ...c.data() })
          })
        })
      ).subscribe(data => {
        this.crops = data;
      });
}

}
