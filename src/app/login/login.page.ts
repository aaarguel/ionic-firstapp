import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { doc_users} from '../interfaces/doc-users';
import {Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { map, take, debounceTime } from 'rxjs/operators';
export class CustomValidator {
  static username(afs: AngularFirestore) {
    return (control: AbstractControl) => {
      const username = control.value.toLowerCase();
      return afs.collection('usuarios', ref=> ref.where('username','==',username))
      .valueChanges().pipe(
        debounceTime(500),
        take(1),
        map(arr=>arr.length?{usernameAvailable:false}:null)
      )
    }
  }
}
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})



export class LoginPage implements OnInit {
  usuario: string;
  contrasena: string;
  document: doc_users;  
  loginForm: FormGroup;

  constructor(private router: Router,
              private afs: AngularFirestore,
              private firebase: FirebaseService,
              private formBuilder: FormBuilder) { 
    
  }

  ngOnInit() { 
    this.initForm();
    this.firebase.getUsers().subscribe(usuarios=>{ //Puede cambiar por then
      console.log(usuarios);
    });
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      username : ['',[Validators.required, CustomValidator.username(this.afs)]],
      password : ['',[Validators.required]]
    });
  }

  public errorMessages = {    
    password: [
      { type: 'required', message: 'Se necesita la contraseña' }      
    ],
  };

  change(ev) {
    console.log(this.loginForm.controls['username'].errors)
  }
  get username() {
    return this.loginForm.get("username");
  }
  get password() {
    return this.loginForm.get("password");
  }

  logForm() {
    this.firebase.logIn(this.usuario,this.contrasena).subscribe(doc=>{   
      this.document=doc[0];      
      if(this.document){
        console.log(this.document.data);
        this.router.navigate(['/folder/Inbox']);
      }else{
        console.log("jeje :v buen  intento rufian");
      }
    });
    
  }


  public submit() {
    console.log(this.loginForm.value);
  }    
}

