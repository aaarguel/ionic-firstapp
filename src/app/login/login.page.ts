import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { doc_users} from '../interfaces/doc-users';
import {Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { map, take, debounceTime } from 'rxjs/operators';
import { interval } from 'rxjs';

export class CustomValidator {
  static username(afs: AngularFirestore,
                  firebase: FirebaseService) {
    return (control: AbstractControl) => {
      const username = control.value;
      
      console.log(username);
      return new Promise(resolve => {
        //Fake a slow response from server
        firebase.getUserbyUserName(username).subscribe(data =>{    //Para obtener la data que se necesita    
          setTimeout(() => {          
            if(!(data.length>0)){
              resolve({
                "username taken": true
              });
            } else {
              resolve(null);
            }
          }, 2000);                                        
        });        
      });
    }
  }


  static login(afs: AngularFirestore,
    firebase: FirebaseService,
    username: AbstractControl,
    router: Router) {
    return (control: AbstractControl) => {          
          const password = control.value;  
          let document: doc_users;         
          console.log(username);
          console.log(password)
          return new Promise(resolve => {
          //Fake a slow response from server
          firebase.logIn(username.value,password).subscribe(doc=>{             
            setTimeout(() => {          
              document=doc[0];      
              if(document){
                console.log(document.data);
                router.navigate(['/folder/Inbox']);
              }else{
                resolve(null);
              }
            }, 2000);            
          });                 
      });
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
  passForm: FormGroup;
  constructor(private router: Router,
              private afs: AngularFirestore,
              private firebase: FirebaseService,
              private formBuilder: FormBuilder) { 
    
  }

  ngOnInit() { 
    this.initForm(); 
    console.log("dañadisimo el proyecto :'v");
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      username : ['',Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')]), CustomValidator.username(this.afs,this.firebase)],      
    });

    this.passForm = this.formBuilder.group({      
      password : ['',Validators.compose([Validators.required]), CustomValidator.login(this.afs,this.firebase,this.loginForm.controls.username,this.router)]
    });
  }

  

  change(ev) {
    //console.log(this.loginForm.controls['username'].errors)
  }
  
  get username() {
    return this.loginForm.get("username");
  }
  get password() {
    return this.passForm.get("password");
  }

  logForm() {
    this.firebase.logIn(this.loginForm.value.username,this.loginForm.value.password).subscribe(doc=>{   
      this.document=doc[0];      
      if(this.document){
        console.log(this.document.data);
        this.router.navigate(['/folder/Inbox']);
      }else{
        console.log("jeje :v buen  intento rufian");
      }
    });    
  }

  registerForm(ev){    
    console.log("jeje :v buen  intento rufian");
    this.router.navigate(['auth/register']);
  }

}

