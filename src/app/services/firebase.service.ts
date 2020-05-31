import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { map, switchMap } from 'rxjs/operators';
import { doc_users} from '../interfaces/doc-users';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private fireStore: AngularFirestore) { }


  getUserbyUserName() {
    return this.fireStore.collection('usuarios').snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        return data;
      });
    }));
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
