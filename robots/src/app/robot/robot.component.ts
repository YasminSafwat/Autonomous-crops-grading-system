import { Component, Input, OnInit } from '@angular/core';
import { collectionSnapshots, where } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { ServerServiceService } from '../service/server-service.service';
import { AI } from 'src/app/service/AI.service';
import { query } from '@firebase/firestore';

@Component({
  selector: 'app-robot',
  templateUrl: './robot.component.html',
  styleUrls: ['./robot.component.css']
})
export class RobotComponent implements OnInit {
  @Input() item: any;
  btnValue: string = "";
  crops: any[]=[];
  constructor(private service: ServerServiceService, private AI: AI) { }

  ngOnInit(): void {
    collectionSnapshots(this.service.getSubCollection(this.item)).pipe(
      map((changes) => {
        return changes.map((c) => {
          return ({ id: c.id, ...c.data() })
        })
      })
    ).subscribe(data => {
        this.crops = data;
    });
  }

  btnClick(){
    if (this.item.ON === false){
      this.service.updateDocument(this.item.id, true, this.item.crop_name).then(() => {
        this.AI.ngOnInit(this.item.id, this.crops);
        this.AI.grade(this.item, this.crops);
      })
    } 
    else {
      this.service.updateDocument(this.item.id, false, this.item.crop_name).then(() => {
      })
  }
  } 
}
