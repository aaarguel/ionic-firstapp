import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { doc_users} from '../interfaces/doc-users';
import {Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { map, take, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario: string;
  contrasena: string;
  document: doc_users;  

  loginForm = this.formBuilder.group({
    username : ['',[Validators.required, this.firebase.getUserbyUserName(this.usuario)]],
    password : ['',[Validators.required]]
  });

  public errorMessages = {    
    password: [
      { type: 'required', message: 'Se necesita la contraseña' }      
    ],
  };


  constructor(private router: Router,
              private afs: AngularFirestore,
              private firebase: FirebaseService,
              private formBuilder: FormBuilder) { 
    
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

  ngOnInit() { 
    this.firebase.getUsers().subscribe(usuarios=>{ //Puede cambiar por then
      console.log(usuarios);
    });
  }
    
}

