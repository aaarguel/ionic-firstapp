import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario: string;
  contrasena: string;
  
  constructor(private router: Router) { 
    
  }

  logForm() {
    if(this.usuario === "aaron" && this.contrasena === "prueba123"){
      this.router.navigate(['/folder/Inbox']);
    }else{
      console.log("jeje :v buen  intento rufian");
    }
  }

  ngOnInit() {
  }

}
