import { Injectable } from '@angular/core';
import { doc, addDoc, updateDoc, collection, Firestore, getDoc, setDoc} from '@angular/fire/firestore';
import { Crop } from '../models/crop';

@Injectable({
  providedIn: 'root'
})
export class ServerServiceService {

  constructor(private db: Firestore) { }

  createDocument(item: any, idd: string, crop: string){
    const cityRef = doc(this.db, 'Items', idd);
    setDoc(cityRef, {ON: false, crop_name: crop});
  }

  createSubDocument(item_id: string, crop: Crop){
    const docRef = doc(this.db, "Items", item_id);
    const colRef = collection(docRef, "crops");
    return addDoc(colRef, {...crop});
  }

  getSubCollection(i: any) {
    const ref = "Items/" + i.id + "/crops";
    const dbInstance = collection(this.db, ref);
    return dbInstance
  }

  getAll() {
    return collection(this.db, "Items");
  }

  updateDocument(id: string, value: boolean) {
    const dataUpdate = doc(this.db, "Items", id);
    return updateDoc(dataUpdate, {
        ON: value
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
