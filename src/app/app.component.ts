import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Database, ref, set,child,get,getDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'App';
  path: any;
  constructor(private s: AngularFireStorage, private db: Database) { }
  upload(event: any) {
    this.path = event.target.files[0];
    console.log(this.path.name)
  }
  uploadImage() {

    this.s.upload("/backup/" + this.path.name, this.path)
  }

  RegisterData() {
    set(ref(this.db, 'users/Gowtham1'), {
      username: 'Gowtham1',
      email: 'empty@gmail1.com',
      profile_picture: 'nothing'
    });
  }

  getValuefromDB() {
    get(child(ref(getDatabase()), 'users/')).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }
}
