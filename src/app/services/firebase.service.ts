import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { map, switchMap, take, debounceTime } from 'rxjs/operators';
import {Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { doc_users} from '../interfaces/doc-users';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private fireStore: AngularFirestore) { }


  getUserbyUserName(username: string) {
    (control: AbstractControl) => {
      const username = control.value.toLowerCase();
      return this.fireStore.collection('usuarios', ref => ref.where('username','==', username))
      .valueChanges().pipe(
        debounceTime(500),
        take(1),
        map(arr => arr.length ? { usernameAvaliable : false} : null),
      )
    }
  }

  getUsers() {
    return this.fireStore.collection('usuarios').snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        return data;
      });
    }));
  }

  logIn(username: string, password: string){
    return this.fireStore.collection('usuarios', ref => ref.where('username', '==', username).
    where('password', '==', password)).snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data();        
        return { id, data } as doc_users;
      });
    }));
  }
}
