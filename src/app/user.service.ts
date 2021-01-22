import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AppUser } from './models/app-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save(user: firebase.default.UserInfo) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email,
      isAdmin: true
    });
  }
  get(uid: string): Observable<AppUser>{
    return this.db.object('/users/'+uid).valueChanges() as Observable<AppUser>;
  }
}
