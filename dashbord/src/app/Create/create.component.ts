import { Component, Input, OnInit } from '@angular/core';
import { ServerServiceService } from '../service/server-service.service';
import { Crop } from '../models/crop';
import { CollectionReference, collectionSnapshots, Firestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  constructor(private serverService: ServerServiceService) { }

  name: string = 'tomato';
  organicity: boolean = true;
  insect_pests: boolean = true;
  crop_number: number = 0;
  Items: any[] = [];
  idd: number = 0;
  cropss: string[] = ['Apple', 'Tomato', 'Eggplant', 'Peach', 'Pear', 'Orange', 'Leek', 'Strawberry'];
  @Input() valuez: string = "fgdf";

  ngOnInit(): void {
    collectionSnapshots(this.serverService.getAll()).pipe(
      map((changes) => {
        return changes.map((c) => {
          return ({ id: c.id, ...c.data() })
        })
      })
    ).subscribe(data => {
      this.Items = data;
    });
  }

  sendToFireStore(){
    this.idd= this.Items.length
    console.log(this.idd);
    let item : {
      crop_name : string,
      ON : boolean
    } = { crop_name :this.name, ON : false}
    this.serverService.createDocument(item, this.idd.toString(), this.name);
    
    for(let i=0; i <= this.crop_number; i++){
      let crop : Crop = { 
        organicity : this.organicity,
        insect_pests : this.insect_pests,
        color : "",
        shape : "",
        blemishes : false,
        damages : (Math.floor(Math.random() * 2) == 0? false : true),
        provided : false,
        sorted : false,
        grade : ""
      }
      
      this.serverService.createSubDocument(this.idd.toString() , crop);
    }
    alert("Successfully planted "+this.name+"s!");
  }
}
