import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { doc_users} from '../interfaces/doc-users';
import {Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';

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
            console.log(data);
            if((data.length!=0)){
              console.log("1");
              resolve({
                "username taken": true
              });
            } else {
              console.log("2");
              resolve(null);
            }
          }, 2000);                                        
        });        
      });
    }
  }
}



@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  regisForm: FormGroup;  


  constructor(private router: Router,
              private afs: AngularFirestore,
              private firebase: FirebaseService,
              private formBuilder: FormBuilder) {


  }

 ngOnInit() { 
    this.initForm();        
  }

  initForm() {
    this.regisForm = this.formBuilder.group({
      firstname : ['',Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')])],
      lastname : ['',Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')])],
      email : ['',[Validators.required,Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')]],
      username : ['',Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')]), CustomValidator.username(this.afs,this.firebase)],
      password : ['',Validators.compose([Validators.required])],            
    });
  }


  get firstname() {
    return this.regisForm.get("firstname");
  }
  get lastname() {
    return this.regisForm.get("lastname");
  }
  get email() {
    return this.regisForm.get("email");
  }
  get username() {
    return this.regisForm.get("username");
  }
  get password() {
    return this.regisForm.get("password");
  }
  
  async signIn() {    
    const data = {
      firstname: this.regisForm.value.username,
      lastname: this.regisForm.value.lastname,
      email: this.regisForm.value.email,
      username: this.regisForm.value.username,
      password: this.regisForm.value.password
    };
    console.log("por añadir el usuario");
    const docRef = await this.afs.collection('usuarios').add(data);
    console.log("routeo");
    this.router.navigate(['login']);    
  }

  logForm(){
    this.router.navigate(['login']);
  }


}
