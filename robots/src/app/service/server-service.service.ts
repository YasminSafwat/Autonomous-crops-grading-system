import { Injectable } from '@angular/core';
import { doc, addDoc, updateDoc, collection, Firestore, getDoc} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ServerServiceService {

  constructor(private db: Firestore) { }

  getSubCollection(i: any) {
    const ref = "Items/" + i.id + "/crops";
    const dbInstance = collection(this.db, ref);
    return dbInstance
  }

  getAll() {
    const ref = collection(this.db, "Items");
    return collection(this.db, "Items");
  }

  updateDocument(id: string, value: boolean, crop_name: string) {
    const dataUpdate = doc(this.db, "Items", id);
    return updateDoc(dataUpdate, {
        ON: value,
        crop_name: crop_name
    });
  }

  updateSubDocument(item_id: string, crop_id: string, blemishes: boolean, color: string, shape: string
    , provided: boolean, sorted: boolean) {
    const ref = "Items/"+item_id+"/crops";
    const dataUpdate = doc(this.db, ref, crop_id);
    return updateDoc(dataUpdate, {
        blemishes: blemishes,
        color: color,
        shape: shape,
        provided: provided,
        sorted: sorted
    });
  }

  updateGrade(item_id: string, crop_id: string, grade: string) {
    const ref = "Items/"+item_id+"/crops";
    const dataUpdate = doc(this.db, ref, crop_id);
    return updateDoc(dataUpdate, {
        grade: grade
    });
  }

  getDocument(id: string) {
      const dbInstance = collection(this.db, "Items");
      return getDoc(doc(dbInstance, id));
  }

  getSubDocument(i: any, id: string) {
    const ref = "Items/" + i.id + "/crops";
    const dbInstance = collection(this.db, ref);
    return getDoc(doc(dbInstance, id));
}

}
