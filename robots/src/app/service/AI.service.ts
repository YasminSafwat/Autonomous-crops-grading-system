import { Injectable } from '@angular/core';
import { ServerServiceService } from '../service/server-service.service';

@Injectable({
  providedIn: 'root'
})

export class AI {
    constructor(private service: ServerServiceService){
    }

    ngOnInit(item_id: string, crops: any[]){
        for (let crop of crops){
            this.service.updateSubDocument(item_id, crop.id, this.check_blemishes()
            ,this.check_color(), this.check_shape(), true, true)
        }
        return new Promise((resolve, reject) => {
        });
    }
    
    check_blemishes(){
        var a = (this.Sensor() == 0? false : true);
        return a;
    }

    check_color(){
        var a = (this.Sensor() == 0? "abnormal" : "normal");
        return a;
    }

    check_shape(){
        var a = (this.Sensor() == 0? "abnormal" : "normal");
        return a;
    }

    check_damages(){
        var a = (this.Sensor() == 0? false : true);
        return a;
    }

    Sensor(){
        let x = Math.random() * 2;
        x = Math.floor(x);
        return x;
    }

    grade(item: any, crops: any[]){
        const mapGrade = (crop: any, value: number) => {
            if (crop.damages)
                return 'E'
            else {
                if (value >= 8) {
                    return 'A'
                } else if (value >= 6) {
                    return 'B'
                } else if (value >= 3) {
                    return 'C'
                }
                return 'D'
                }
    }
        crops.map((crop) => {
            const checkRipeness = ((crop.color == "normal"? 6 : 0) + (crop.shape == "normal"? 6 : 0) 
                                + (crop.blemishes == false ? 6 : 0)) / 3;
            const checkOrganicity = crop.organicity
            const isInsect = crop.insect_fungi
            const value = (checkRipeness) + (checkOrganicity ? 2 : 0) + (!isInsect ? 2 : 0)
            this.service.updateGrade(item.id, crop.id, mapGrade(crop, value));
        }) 
    }

}
